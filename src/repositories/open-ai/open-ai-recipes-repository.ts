import { env } from '@/env'
import { Configuration, OpenAIApi } from 'openai'
import { RecipesRepository } from '../recipes-repository'

const configuration = new Configuration({
  apiKey: env.OPEN_AI_KEY,
})

const openai = new OpenAIApi(configuration)

export class OpenAiRecipesRepository implements RecipesRepository {
  async get(data: string[]): Promise<string> {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
            Responda em um estilo consistente.
            Use o passo a passo para dar as respostas ao usuário:
            1. Você vai receber uma lista de itens, escolha alguns itens interessantes para montar uma receita.
            2. Elabore uma receita que tenha como ingredientes esses items.
            3. Separe os ingredientes em duas listas: uma com os itens que ele já tem e outra com os que ele não tem.
            4. Sua resposta deve ser curta.
            `,
        },
        {
          role: 'user',
          content: `['ovo', 'abobrinha', 'suco de uva']`,
        },
        {
          role: 'assistant',
          content: `Que tal uma receita de ovo frito?
          Você vai precisar de:
          O que você já tem:
          1 ovo

          Certifique-se de já ter:
          1 colher de azeite
          Sal

          Em uma frigideira ao fogo baixo, quebre o ovo e deixe cozinhar por 2 minutos. Adicione o sal a gosto. Vire do outro lado e deixe até ficar do seu gosto. E está pronto!
          `,
        },
        {
          role: 'user',
          content: `['arroz', 'banana', 'alface', 'ervilha', 'milho']`,
        },
        {
          role: 'assistant',
          content: `Que tal um arroz com milho e ervilha?
          O que você já tem:
          - 1/2 xícara Arroz
          - 1 lata de Milho
          - 1 lata de Ervilha

          Certifique-se de já ter:
          - 1 colher de azeite
          - 1 colher de Sal
          - 2 alho picado
          - 2 cebola picada

          Em uma panela, refogue a cebola e o alho no óleo. Adicione a ervilha, o milho e refogue por alguns minutos. Despeje 2,5 xícaras de água fervente e adicione o arroz e o sal, misturando delicadamente. Reduza o fogo, tampe a panela e cozinhe em fogo baixo até que toda a água seja absorvida.
          `,
        },

        {
          role: 'user',
          content: `['abobrinha', 'cenoura', 'alface', 'chuchu', 'mandioquinha']`,
        },
        {
          role: 'assistant',
          content: `Que tal um arroz com milho e ervilha?
          O que você já tem:
          - Abobrinha
          - Cenoura
          - Alface
          - Chuchu
          - Mandioquinha

          Certifique-se de já ter:
          - Azeite
          - Vinagre
          - Sal

          Para preparar a salada, corte a abobrinha, a cenoura, o chuchu e a mandioquinha em cubos pequenos. Cozinhe-os em água fervente até ficarem macios, mas ainda crocantes. Escorra e deixe esfriar. Em uma tigela, misture os legumes cozidos com as folhas de alface rasgadas. Tempere com azeite, vinagre e sal a gosto. Misture bem e sirva. `,
        },
        {
          role: 'user',
          content: `${data}`,
        },
      ],
      max_tokens: 500,
      temperature: 0,
    })
    const responseContent = response.data.choices[0].message?.content
    console.log(responseContent)

    return responseContent ?? 'receita nula'
  }
}
