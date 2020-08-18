import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import Friend from './Friend'
import FriendForm from './FriendForm'

// 👉 the shape of the list of friends from API
const initialFriendsList = [
  {
    id: uuid(), // uuid is a lib to generate random, unique ids
    username: 'Michael',
    email: 'michael@michael.com',
    role: 'Student',
  },
]

// 👉 the shape of the state that drives the form
const initialFormValues = {
  ///// TEXT INPUTS /////
  username: '',
  email: '',
  ///// DROPDOWN /////
  role: '',
}

// 👉 helpers to simulate async data [GET] and [POST] (tomorrow we use the real thing!)
const fakeAxiosGet = () => {
  return Promise.resolve({ status: 200, success: true, data: initialFriendsList })
}
const fakeAxiosPost = (url, { username, email, role }) => {
  const newFriend = { id: uuid(), username, email, role }
  return Promise.resolve({ status: 200, success: true, data: newFriend })
}

export default function App() {
  const [friends, setFriends] = useState([]) // careful what you initialize your state to

  // 🔥 STEP 1 - WE NEED STATE TO HOLD ALL VALUES OF THE FORM!
  const [formValues, setFormValues] = useState(initialFormValues) // fix this using the state hook

  const updateForm = (inputName, inputValue) => { // role 'instructor'
    // 🔥 STEP 2 - IMPLEMENT a "form state updater" which will be used inside the inputs' `onChange` handler
    //  It takes in the name of an input and its value, and updates `formValues`
    setFormValues({ ...formValues, [inputName]: inputValue })
  }

  const submitForm = () => {
    // 🔥 STEP 3 - IMPLEMENT a submit function which will be used inside the form's own `onSubmit`
    //  a) make a new friend object, trimming whitespace from username and email
    const friend = {
      // id: uuid(), // it's the backend that'll generate a unique id
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
    }
    //  b) prevent further action if either username or email or role is empty string after trimming
    // if (!friend.username || !friend.email) return
    //  c) POST new friend to backend, and on success update the list of friends in state with the new friend from API
    fakeAxiosPost('fake.com', friend)
      .then(res => {
        debugger
      })
      .catch(err => {
        debugger
      })
    //  d) also on success clear the form
  }

  useEffect(() => {
    fakeAxiosGet('fakeapi.com').then(res => setFriends(res.data))
  }, [])

  return (
    <div className='container'>
      <header><h1>Friends App</h1></header>

      <FriendForm
        // 🔥 STEP 4 - The form component needs its props.
        //  Check implementation of FriendForm
        //  to see what props it expects.
        values={{}}
      />

      {
        friends.map(friend => {
          return (
            <Friend key={friend.id} details={friend} />
          )
        })
      }
    </div>
  )
}
