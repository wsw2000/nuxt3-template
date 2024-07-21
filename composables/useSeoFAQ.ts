interface FAQ {
  question: string
  answer: string
}

export const useSeoFAQ = (list: Ref<FAQ[]>) => {
  const json = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.value.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }))

  const script = computed(() => [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(json.value, null, 2),
    },
  ])

  useHead({
    script,
  })
}
