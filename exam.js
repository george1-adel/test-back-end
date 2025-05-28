// استيراد الأسئلة من ملف questions.js
import { questions } from './questions.js';

// دالة للحصول على أسئلة فصل معين
export function getChapterQuestions(chapterNumber) {
    return questions.filter(q => q.chapter === chapterNumber);
}

// دالة للحصول على قائمة الفصول المتاحة
export function getAvailableChapters() {
    const chapters = new Set(questions.map(q => q.chapter).filter(c => c !== undefined));
    return Array.from(chapters).sort();
}

// دالة لإنشاء اختبار لفصل معين
export function createChapterExam(chapterNumber, numberOfQuestions = 10) {
    const chapterQuestions = getChapterQuestions(chapterNumber);
    
    // خلط الأسئلة عشوائياً
    const shuffledQuestions = chapterQuestions.sort(() => Math.random() - 0.5);
    
    // اختيار العدد المطلوب من الأسئلة
    return shuffledQuestions.slice(0, Math.min(numberOfQuestions, chapterQuestions.length));
}

// دالة للتحقق من إجابة المستخدم
export function checkAnswer(question, userAnswer) {
    return question.correctAnswer === userAnswer;
}

// دالة لحساب نتيجة الاختبار
export function calculateScore(examQuestions, userAnswers) {
    let correctAnswers = 0;
    examQuestions.forEach((question, index) => {
        if (checkAnswer(question, userAnswers[index])) {
            correctAnswers++;
        }
    });
    
    return {
        totalQuestions: examQuestions.length,
        correctAnswers: correctAnswers,
        score: (correctAnswers / examQuestions.length) * 100
    };
}

// دالة للحصول على شرح الإجابة
export function getAnswerExplanation(question) {
    return question.explanation;
} 