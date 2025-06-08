// Este é o início da implementação do site com KOOS, WOMAC, SF-36, Lysholm e IKDC interativos com cálculo automático
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const header = (
    <header className="bg-white shadow p-4 text-center font-semibold text-lg">
      Dr. Bruno Bellaguarda
    </header>
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questionsKOOS = [
  { id: 'koos1', text: 'Com que frequência você sente dor no joelho?', options: ['Nunca', 'Mensalmente', 'Semanalmente', 'Diariamente'] },
  { id: 'koos2', text: 'Você sente rigidez no joelho após ficar sentado ou deitado?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'koos3', text: 'Você sente inchaço no joelho?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'koos4', text: 'Você ouve sons (estalidos, cliques) ao mover o joelho?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'koos5', text: 'O joelho dobra totalmente?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Muita dificuldade', 'Não dobra'] },
  { id: 'koos6', text: 'O joelho estica totalmente?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Muita dificuldade', 'Não estica'] },
  { id: 'koos7', text: 'Você sente que o joelho falha ou escorrega?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'koos8', text: 'Você evita apoiar o peso no joelho?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'koos9', text: 'Você sente dor ao subir escadas?', options: ['Nunca', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'koos10', text: 'Você sente dor ao descer escadas?', options: ['Nunca', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'koos11', text: 'Você sente dor ao caminhar?', options: ['Nunca', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'koos12', text: 'Você sente dor ao sentar ou levantar-se de uma cadeira?', options: ['Nunca', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'koos13', text: 'Você sente dor ao se deitar?', options: ['Nunca', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'koos14', text: 'Você sente dor ao se levantar da cama?', options: ['Nunca', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'koos15', text: 'Você sente dor ao dobrar o joelho?', options: ['Nunca', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'koos16', text: 'Você sente dor ao esticar o joelho?', options: ['Nunca', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'koos17', text: 'Você consegue levantar-se da posição sentada?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Muita dificuldade', 'Incapaz'] },
  { id: 'koos18', text: 'Você consegue colocar meias ou calçados?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Muita dificuldade', 'Incapaz'] },
  { id: 'koos19', text: 'Você consegue se agachar?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Muita dificuldade', 'Incapaz'] },
  { id: 'koos20', text: 'Você consegue correr?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Muita dificuldade', 'Incapaz'] },
  { id: 'koos21', text: 'Você consegue pular?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Muita dificuldade', 'Incapaz'] },
  { id: 'koos22', text: 'Você sente o joelho instável ao caminhar?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'koos23', text: 'Você sente confiança no seu joelho durante atividades físicas?', options: ['Sempre', 'Frequentemente', 'Às vezes', 'Raramente', 'Nunca'] },
  { id: 'koos24', text: 'Você consegue ajoelhar-se?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Muita dificuldade', 'Incapaz'] },
  { id: 'koos25', text: 'Você consegue correr em linha reta?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Muita dificuldade', 'Incapaz'] },
  { id: 'koos26', text: 'Você consegue realizar esportes com mudanças de direção?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Muita dificuldade', 'Incapaz'] },
  { id: 'koos27', text: 'Você sente seu joelho sobrecarregado após atividade física?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'koos28', text: 'Você sente que o joelho limita sua vida?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'koos29', text: 'Você sente medo de usar o joelho?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'koos30', text: 'Você sente dificuldade para dormir por causa do joelho?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'koos31', text: 'Você sente que o joelho está afetando seu humor?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'koos32', text: 'Você evita atividades sociais por causa do joelho?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
];

  const questionsWOMAC = [
  { id: 'womac1', text: 'Dor ao caminhar sobre superfície plana', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac2', text: 'Dor ao subir ou descer escadas', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac3', text: 'Dor à noite enquanto está na cama', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac4', text: 'Dor ao sentar ou deitar', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac5', text: 'Dor ao ficar em pé', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac6', text: 'Dificuldade para descer escadas', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac7', text: 'Dificuldade para subir escadas', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac8', text: 'Dificuldade para se levantar de uma cadeira', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac9', text: 'Dificuldade para ficar em pé', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac10', text: 'Dificuldade para se curvar para frente', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac11', text: 'Dificuldade para caminhar sobre superfície plana', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac12', text: 'Dificuldade para entrar e sair de um carro', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac13', text: 'Dificuldade para ir às compras', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac14', text: 'Dificuldade para colocar meias', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac15', text: 'Dificuldade para se deitar na cama', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac16', text: 'Dificuldade para levantar da cama', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] },
  { id: 'womac17', text: 'Dificuldade para entrar e sair do banheiro', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Extrema'] }
];

  const questionsSF36 = [
  { id: 'sf361', text: 'Você tem se sentido cheio(a) de energia?', options: ['Sempre', 'Frequentemente', 'Às vezes', 'Raramente', 'Nunca'] },
  { id: 'sf362', text: 'Durante as últimas 4 semanas, quanto sua saúde física interferiu em seu trabalho ou outras atividades diárias?', options: ['Nada', 'Pouco', 'Moderadamente', 'Muito', 'Extremamente'] },
  { id: 'sf363', text: 'Você consegue realizar atividades vigorosas, como correr, levantar objetos pesados ou participar de esportes intensos?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Com muita dificuldade', 'Incapaz'] },
  { id: 'sf364', text: 'Você consegue caminhar mais de 1 quilômetro?', options: ['Sem dificuldade', 'Com alguma dificuldade', 'Com muita dificuldade', 'Incapaz'] },
  { id: 'sf365', text: 'Você tem se sentido calmo(a) e tranquilo(a)?', options: ['Sempre', 'Frequentemente', 'Às vezes', 'Raramente', 'Nunca'] },
  { id: 'sf366', text: 'Você teve energia suficiente para fazer o que queria?', options: ['Sempre', 'Frequentemente', 'Às vezes', 'Raramente', 'Nunca'] },
  { id: 'sf367', text: 'Quanto tempo sua dor interferiu em suas atividades normais?', options: ['Nada', 'Pouco', 'Moderadamente', 'Muito', 'Extremamente'] },
  { id: 'sf368', text: 'Você sentiu que sua saúde piorou nos últimos tempos?', options: ['Muito pior', 'Um pouco pior', 'Igual', 'Um pouco melhor', 'Muito melhor'] }
];

  const questionsLysholm = [
  { id: 'lysholm1', text: 'Você manca?', options: ['Nunca', 'Leve e ocasional', 'Sempre'] },
  { id: 'lysholm2', text: 'Seu joelho trava?', options: ['Nunca', 'Raramente', 'Frequentemente'] },
  { id: 'lysholm3', text: 'Você sente dor ao realizar atividades físicas?', options: ['Nunca', 'Leve', 'Moderada', 'Grave'] },
  { id: 'lysholm4', text: 'O joelho incha após esforço?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente'] },
  { id: 'lysholm5', text: 'O joelho falha ao caminhar ou correr?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente'] },
  { id: 'lysholm6', text: 'Você consegue agachar e levantar sem apoio?', options: ['Sim', 'Com dificuldade', 'Não'] },
  { id: 'lysholm7', text: 'Você consegue correr?', options: ['Sem limitação', 'Com alguma limitação', 'Não consegue correr'] },
  { id: 'lysholm8', text: 'Você consegue usar escadas normalmente?', options: ['Sim', 'Com alguma dificuldade', 'Não'] }
];

  const questionsIKDC = [
  { id: 'ikdc1', text: 'Com que frequência o seu joelho falha ou falseia?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'ikdc2', text: 'Qual o nível de dor que você sente durante atividades moderadas (ex: caminhar rápido)?', options: ['Nenhuma', 'Leve', 'Moderada', 'Intensa', 'Incapacitante'] },
  { id: 'ikdc3', text: 'Você tem dificuldade para subir escadas?', options: ['Nenhuma', 'Leve', 'Moderada', 'Grave', 'Incapaz'] },
  { id: 'ikdc4', text: 'Você sente seu joelho instável durante as atividades físicas?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'ikdc5', text: 'Você evita atividades esportivas por causa do joelho?', options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
  { id: 'ikdc6', text: 'Você sente dor ao correr?', options: ['Nunca', 'Leve', 'Moderada', 'Intensa', 'Sempre'] },
  { id: 'ikdc7', text: 'Você consegue agachar completamente?', options: ['Sim, sem dor', 'Sim, com alguma dor', 'Com dor moderada', 'Com dor intensa', 'Incapaz'] },
  { id: 'ikdc8', text: 'Qual é o seu nível atual de função com o joelho comparado ao seu estado antes da lesão?', options: ['100%', '75%', '50%', '25%', '0%'] }
];

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
      const total = questions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
      return Math.round(100 - (total / ((questions.length * (q => q.options.length - 1)(questions[0])))) * 100);
    };

    return {
      koosScore: score(questionsKOOS),
      womacScore: score(questionsWOMAC),
      sf36Score: score(questionsSF36),
      lysholmScore: score(questionsLysholm),
      ikdcScore: score(questionsIKDC)
    };
  };

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
