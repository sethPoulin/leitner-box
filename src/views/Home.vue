<template>
  <div id="leitner-box">
    <!-- <div class="level level1">Level 1  <span>cards remaining: {{cardsRemaining.level1.length}}</span></div>
    <div class="level level2">Level 2  <span>cards remaining: {{cardsRemaining.level2.length}}</span></div>
    <div class="level level3">Level 3  <span>cards remaining: {{cardsRemaining.level3.length}}</span></div>
    <div class="level level4">Level 4  <span>cards remaining: {{cardsRemaining.level4.length}}</span></div>
    <div class="level level5">Level 5  <span>cards remaining: {{cardsRemaining.level5.length}}</span></div>
    <div class="level level6">Level 6  <span>cards remaining: {{cardsRemaining.level6.length}}</span></div>
    <div class="level level7">Level 7  <span>cards remaining: {{cardsRemaining.level7.length}}</span></div> -->
  </div>
  <button @click="action = 'add'">Add a card</button>
  <button @click="action = 'start-session'">Start memory session</button>
  <pre v-if="allCardsFb">{{allCardsFb}}</pre>
  <div v-if="action === 'add'" class="home" id="card-add">
    <form @submit.prevent="addCard()">
      <text-input
        label="Title:"
        id="card-add-title"
        @sendValue="card.title = $event"
      />
      <text-area
        label="Question:"
        id="card-add-question"
        @sendValue="card.question = $event"
      />
      <text-area
        label="Answer:"
        id="card-add-answer"
        @sendValue="card.answer = $event"
      />
      <button type="submit">Add card</button>
    </form>
    <pre>{{card.title}}</pre>
    <pre>{{card.question}}</pre>
    <pre>{{card.answer}}</pre>
  </div>
</template>

<script>
import {db} from '@/data/db'
import TextInput from '../components/TextInput.vue'
import TextArea from '../components/TextArea.vue'


// updates['/password/' + newPostKey] = 'baloney' //this is weird looking syntax but it's just saying, for the object we're creating, include a key with a URL string that tells Firebase where to put the node, and a corresponding value.  At this point "updates" would look like this:
// { '/password/7h51lkf7lasjh': 'baloney' }.  When this object is sent as `update(updates)`, it just tells Firebase where to create this key value pair - on the 'password' node, create a key-value pair 7h51lkf7lasjh: 'baloney'.
// db.ref().update(updates)


export default {
  name: 'Home',
  components: {
    TextInput,
    TextArea
  },
  created () {
    this.getCards();
  },
  data() {
    return {
      action: undefined,
      allCardsFb: undefined,
      card: {
        question: undefined,
        answer: undefined,
        level: undefined
      }
      // cards: { // this is stored and retrieved from Firebase
      //   level1: ['peas', 'khkjh', 'afsdf'],
      //   level2: ['fasldf', 'faslkdf', 'falskdjf'],
      //   level3: [],
      //   level4: [],
      //   level5: ['lkjhh', 'falskj', 'akjhk'],
      //   level6: [],
      //   level7: []
      // }
    }
  },
  computed: {
    // cardsRemaining () {
    //   const { level1, level2, level3, level4, level5, level6, level7 } = this.cards
    //   return {
    //     level1: level1.length,
    //     level2: level2.length,
    //     level3: level3.length,
    //     level4: level4.length,
    //     level5: level5.length,
    //     level6: level6.length,
    //     level7: level7.length
    //   }
    // }
  },
  methods: {
    addCard () {
      const newKey = db.ref().child('cards').push().key
      const updates = {}
      const { title, question, answer } = this.card
      const newCard = {
        title,
        question,
        answer,
        level: 1
      }
      updates['/cards/' + newKey] = newCard
      updates['/cardlist/' + newKey] = true
      db.ref().update(updates)
    },
    getCards () {
      db.ref().on('value', snap => {  //listen for changes on the entire database; listening to db.ref('<key>') would only listen to that key)
        this.allCardsFb = snap.val()
      })
    }
  }
}

// clicking start session takes you to a page with a random card with its level on it.  If you choose fail, card goes down a level, if you choose pass, card goes up a level.
// How do we determine what cards to ask?  Each card has 'date added to level' property depending on level, if today's date - level change date >= level wait period, add the card to the deck.  For example, today is september 07 and there's a level 3 card that was added to level 3 on september 1st.  September 07 - September 01 = 6 days.  The wait period for level 3 is 4 days, so we add this card to the deck.  If the card had been level 4 instead, we would not have added this card because the wait period is 8 days and only 6 days have elapsed.
// 'Date added' gets added whenever there's a level change.
// cards remaining should be a computed property
// when a card comes up, before user selects pass or fail, user can edit and re-save the card
</script>
