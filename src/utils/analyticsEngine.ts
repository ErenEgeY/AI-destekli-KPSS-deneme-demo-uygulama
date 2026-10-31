import { SubjectId, TopicConfig, SubjectConfig } from '../types/kpss';
import { KPSS_CURRICULUM, getSubjectConfig } from '../config/kpssCurriculum';
import { calculateNet } from './kpssCalculators';

export type TopicStatusTag = 'Güçlü' | 'Orta' | 'Zayıf / Çalışılmalı';

export interface AggregatedTopicStat {
  subjectId: SubjectId;
  subjectName: string;
  topicId: string;
  topicName: string;
  questionCountCurriculum: number;
  percentageCurriculum: number;
  frequentTopics: string[];
  totalAttempted: number;
  correctCount: number;
  wrongCount: number;
  emptyCount: number;
  netScore: number;
  successRatePercentage: number;
  statusTag: TopicStatusTag;
}

export interface SubjectSummaryStat {
  subjectId: SubjectId;
  subjectName: string;
  totalTestsCount: number;
  totalQuestionsAttempted: number;
  totalCorrect: number;
  totalWrong: number;
  totalEmpty: number;
  netScore: number;
  successRatePercentage: number;
  topics: AggregatedTopicStat[];
}

export interface GlobalAnalyticsSummary {
  totalTestsCount: number;
  totalQuestionsSolved: number;
  totalCorrect: number;
  totalWrong: number;
  totalEmpty: number;
  overallNetScore: number;
  estimatedKPSSPoint: number;
  strongestSubjectName: string;
  weakestSubjectName: string;
  subjectSummaries: Record<SubjectId, SubjectSummaryStat>;
  weakTopicsList: AggregatedTopicStat[];
}

/**
 * Retrieves saved test sessions from localStorage
 */
export function getStoredHistory(): any[] {
  try {
    const existingRaw = localStorage.getItem('kpss_test_history');
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch (err) {
    console.error('Failed to read test history from localStorage:', err);
    return [];
  }
}

/**
 * Reset ALL analytics data
 */
export function resetAllAnalyticsData(): void {
  try {
    localStorage.removeItem('kpss_test_history');
  } catch (err) {
    console.error('Failed to clear all test history:', err);
  }
}

/**
 * Reset analytics data for a SPECIFIC subject only
 */
export function resetSubjectAnalyticsData(subjectId: SubjectId): void {
  try {
    const history = getStoredHistory();
    const filtered = history.filter((attempt) => attempt.subjectId !== subjectId);
    localStorage.setItem('kpss_test_history', JSON.stringify(filtered));
  } catch (err) {
    console.error(`Failed to reset analytics for subject ${subjectId}:`, err);
  }
}

/**
 * Reset analytics data for a SPECIFIC sub-topic only
 */
export function resetTopicAnalyticsData(subjectId: SubjectId, topicId: string): void {
  try {
    const history = getStoredHistory();
    const updated = history.map((attempt) => {
      if (attempt.subjectId !== subjectId) return attempt;

      // Filter out questions belonging to topicId
      if (attempt.questions && Array.isArray(attempt.questions)) {
        const remainingQuestions = attempt.questions.filter((q: any) => q.topicId !== topicId);
        const remainingAnswers: Record<string, any> = {};
        let newCorrect = 0;
        let newWrong = 0;
        let newEmpty = 0;

        remainingQuestions.forEach((q: any) => {
          if (attempt.answers && attempt.answers[q.id]) {
            const ans = attempt.answers[q.id];
            remainingAnswers[q.id] = ans;
            if (ans.isCorrect) newCorrect++;
            else if (ans.selectedOption !== null) newWrong++;
            else newEmpty++;
          }
        });

        return {
          ...attempt,
          totalQuestions: remainingQuestions.length,
          correctCount: newCorrect,
          wrongCount: newWrong,
          emptyCount: newEmpty,
          netScore: calculateNet(newCorrect, newWrong),
          questions: remainingQuestions,
          answers: remainingAnswers,
        };
      }

      return attempt;
    }).filter((attempt) => attempt.totalQuestions > 0);

    localStorage.setItem('kpss_test_history', JSON.stringify(updated));
  } catch (err) {
    console.error(`Failed to reset analytics for topic ${topicId}:`, err);
  }
}

/**
 * Computes topic-by-topic aggregated metrics based on test history
 */
export function calculateTopicAnalytics(targetSubjectId?: SubjectId): AggregatedTopicStat[] {
  const history = getStoredHistory();
  const topicMap: Record<string, AggregatedTopicStat> = {};

  const subjectsToProcess = targetSubjectId
    ? [targetSubjectId]
    : (Object.keys(KPSS_CURRICULUM) as SubjectId[]);

  subjectsToProcess.forEach((subId) => {
    const subject = KPSS_CURRICULUM[subId];
    if (!subject) return;

    subject.topics.forEach((topic) => {
      topicMap[topic.id] = {
        subjectId: subId,
        subjectName: subject.name,
        topicId: topic.id,
        topicName: topic.name,
        questionCountCurriculum: topic.questionCount,
        percentageCurriculum: topic.percentage,
        frequentTopics: topic.frequentTopics || [],
        totalAttempted: 0,
        correctCount: 0,
        wrongCount: 0,
        emptyCount: 0,
        netScore: 0,
        successRatePercentage: 0,
        statusTag: 'Zayıf / Çalışılmalı',
      };
    });
  });

  history.forEach((attempt) => {
    if (targetSubjectId && attempt.subjectId !== targetSubjectId) return;

    if (attempt.questions && Array.isArray(attempt.questions) && attempt.answers) {
      attempt.questions.forEach((q: any) => {
        const topicId = q.topicId;
        if (topicMap[topicId]) {
          const ans = attempt.answers[q.id];
          topicMap[topicId].totalAttempted++;

          if (!ans || ans.selectedOption === null) {
            topicMap[topicId].emptyCount++;
          } else if (ans.isCorrect) {
            topicMap[topicId].correctCount++;
          } else {
            topicMap[topicId].wrongCount++;
          }
        }
      });
    } else if (attempt.correctCount !== undefined) {
      const subject = KPSS_CURRICULUM[attempt.subjectId as SubjectId];
      if (subject && subject.topics.length > 0) {
        const firstTopicId = subject.topics[0].id;
        if (topicMap[firstTopicId]) {
          topicMap[firstTopicId].totalAttempted += attempt.totalQuestions || 0;
          topicMap[firstTopicId].correctCount += attempt.correctCount || 0;
          topicMap[firstTopicId].wrongCount += attempt.wrongCount || 0;
          topicMap[firstTopicId].emptyCount += attempt.emptyCount || 0;
        }
      }
    }
  });

  const result = Object.values(topicMap).map((stat) => {
    const net = calculateNet(stat.correctCount, stat.wrongCount);
    const successRate =
      stat.totalAttempted > 0
        ? Math.round((stat.correctCount / stat.totalAttempted) * 100)
        : 0;

    let statusTag: TopicStatusTag = 'Zayıf / Çalışılmalı';
    if (stat.totalAttempted > 0) {
      if (successRate >= 75) {
        statusTag = 'Güçlü';
      } else if (successRate >= 50) {
        statusTag = 'Orta';
      }
    }

    return {
      ...stat,
      netScore: net,
      successRatePercentage: successRate,
      statusTag,
    };
  });

  return result;
}

/**
 * Computes global analytics summary across all subjects and topics
 */
export function getOverallAnalyticsSummary(): GlobalAnalyticsSummary {
  const history = getStoredHistory();
  const allTopicStats = calculateTopicAnalytics();

  let totalQuestionsSolved = 0;
  let totalCorrect = 0;
  let totalWrong = 0;
  let totalEmpty = 0;

  history.forEach((attempt) => {
    totalQuestionsSolved += attempt.totalQuestions || 0;
    totalCorrect += attempt.correctCount || 0;
    totalWrong += attempt.wrongCount || 0;
    totalEmpty += attempt.emptyCount || 0;
  });

  const overallNetScore = calculateNet(totalCorrect, totalWrong);

  const subjectSummaries: Record<SubjectId, SubjectSummaryStat> = {} as any;

  (Object.keys(KPSS_CURRICULUM) as SubjectId[]).forEach((subId) => {
    const subject = KPSS_CURRICULUM[subId];
    const topicsForSub = allTopicStats.filter((t) => t.subjectId === subId);

    const subCorrect = topicsForSub.reduce((acc, t) => acc + t.correctCount, 0);
    const subWrong = topicsForSub.reduce((acc, t) => acc + t.wrongCount, 0);
    const subEmpty = topicsForSub.reduce((acc, t) => acc + t.emptyCount, 0);
    const subAttempted = topicsForSub.reduce((acc, t) => acc + t.totalAttempted, 0);
    const subNet = calculateNet(subCorrect, subWrong);
    const subSuccess = subAttempted > 0 ? Math.round((subCorrect / subAttempted) * 100) : 0;
    const subTestsCount = history.filter((h) => h.subjectId === subId).length;

    subjectSummaries[subId] = {
      subjectId: subId,
      subjectName: subject.name,
      totalTestsCount: subTestsCount,
      totalQuestionsAttempted: subAttempted,
      totalCorrect: subCorrect,
      totalWrong: subWrong,
      totalEmpty: subEmpty,
      netScore: subNet,
      successRatePercentage: subSuccess,
      topics: topicsForSub,
    };
  });

  const sortedSubjects = Object.values(subjectSummaries).sort(
    (a, b) => b.successRatePercentage - a.successRatePercentage
  );

  const strongestSubjectName =
    sortedSubjects.length > 0 && sortedSubjects[0].totalQuestionsAttempted > 0
      ? sortedSubjects[0].subjectName
      : 'Henüz Veri Yok';

  const weakestSubjectName =
    sortedSubjects.length > 0 && sortedSubjects[sortedSubjects.length - 1].totalQuestionsAttempted > 0
      ? sortedSubjects[sortedSubjects.length - 1].subjectName
      : 'Henüz Veri Yok';

  const weakTopicsList = allTopicStats.filter(
    (t) => t.totalAttempted > 0 && t.successRatePercentage < 50
  );

  const estimatedKPSSPoint = Math.min(
    100,
    parseFloat((40 + (overallNetScore / 120) * 60).toFixed(2))
  );

  return {
    totalTestsCount: history.length,
    totalQuestionsSolved,
    totalCorrect,
    totalWrong,
    totalEmpty,
    overallNetScore,
    estimatedKPSSPoint,
    strongestSubjectName,
    weakestSubjectName,
    subjectSummaries,
    weakTopicsList,
  };
}
