const options = [
  {
    tip: "utensílios de cozinha",
    words: [
      "abridor de garrafas",
      "abridor de latas",
      "coador",
      "espátula",
      "ralador",
      "saleiro",
    ],
  },
  {
    tip: "profissões",
    words: [
      "contador",
      "ator",
      "programador",
      "atleta",
      "padeiro",
      "açougueiro",
      "motorista",
      "engenheiro",
    ],
  },
];
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
