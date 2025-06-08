// Este é o início da implementação do site com envio automático via EmailJS
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import emailjs from '@emailjs/browser';

export default function Home() {
  const header = (
    <header className="bg-white shadow p-4 text-center font-semibold text-lg">
      Dr. Bruno Bellaguarda
    </header>
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sent, setSent] = useState(false);

  const questionsKOOS = [...]; // (mesmo conteúdo anterior)
  const questionsWOMAC = [...];
  const questionsSF36 = [...];
  const questionsLysholm = [...];
  const questionsIKDC = [...];

  const allQuestions = [
    ...questionsKOOS,
    ...questionsWOMAC,
    ...questionsSF36,
    ...questionsLysholm,
    ...questionsIKDC,
  ];

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setStep(step + 1);
  };

  const calculateScores = () => {
    const score = (questions) => {
  const max = questions.length * (questions[0].options.length - 1);
  const total = questions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
  return Math.round(100 - (total / max) * 100);
};

    return {
      koosScore: score(questionsKOOS),
      womacScore: score(questionsWOMAC),
      sf36Score: score(questionsSF36),
      lysholmScore: score(questionsLysholm),
      ikdcScore: score(questionsIKDC)
    };
  };

  useEffect(() => {
    if (step >= allQuestions.length && !sent) {
      const scores = calculateScores();
      emailjs.send("service_brunobellaguarda", "Auto-Reply", {
        koosScore: scores.koosScore,
        womacScore: scores.womacScore,
        sf36Score: scores.sf36Score,
        lysholmScore: scores.lysholmScore,
        ikdcScore: scores.ikdcScore,
        answers: JSON.stringify(answers, null, 2),
      }, "TtZ1oGlqsPHD-P9uk")
      .then(() => setSent(true))
      .catch((error) => console.error("Erro ao enviar e-mail:", error));
    }
  }, [step]);

  const currentQuestion = allQuestions[step];

  if (step >= allQuestions.length) {
    const { koosScore, womacScore, sf36Score, lysholmScore, ikdcScore } = calculateScores();

    return (
      <>
        {header}
        <div className="p-4 max-w-xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Obrigado por responder!</h2>
          <p className="mb-2">Suas pontuações foram calculadas automaticamente:</p>
          <ul className="mb-4 list-disc list-inside">
            <li><strong>KOOS:</strong> {koosScore} / 100</li>
            <li><strong>WOMAC:</strong> {womacScore} / 100</li>
            <li><strong>SF-36:</strong> {sf36Score} / 100</li>
            <li><strong>Lysholm:</strong> {lysholmScore} / 100</li>
            <li><strong>IKDC:</strong> {ikdcScore} / 100</li>
          </ul>
          <pre className="bg-gray-100 p-4 rounded text-sm">{JSON.stringify(answers, null, 2)}</pre>
        </div>
      </>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-lg font-semibold">{currentQuestion.text}</h2>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <Button key={index} className="w-full" onClick={() => handleAnswer(currentQuestion.id, index)}>
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
