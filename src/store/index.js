import { createStore } from 'vuex'

export default createStore({
  state: {
    cards: [
      {
        id: 'a123485h',
        question: 'How tall are giraffes?',
        answer: 'Between 4.6 - 6.1 meters',
        attempts: 54,
        level: 3,
        last_attempt: 'January 07, 2021',
        date_created: 'December 22, 2020'
      },
      {
        id: 'a123476h',
        question: 'How old is the sun?',
        answer: '4.6 billion years old',
        attempts: 3,
        level: 2,
        last_attempt: 'January 3, 2021',
        date_created: 'December 11, 2020'
      },
      {
        id: 'a123476h',
        question: 'What is the longest river on earth?',
        answer: 'The Nile',
        attempts: 3,
        level: 2,
        last_attempt: 'January 3, 2021',
        date_created: 'December 11, 2020'
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    allCards (state) {
      return state.cards
    }
  }
})
