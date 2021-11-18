// bucket.js
import { db } from '../../firebase'
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

// Actions
const initialState = {
  is_loaded: false,
  list: [],
}

const LOAD = 'bucket/LOAD'
const CREATE = 'bucket/CREATE'
const REMOVE = 'bucket/REMOVE'
const COMPLETE = 'bucket/COMPLETE'
const LOADING = 'bucket/LOADING'

// Action Creators
export function loadBucket(bucket_list) {
  return { type: LOAD, bucket_list }
}
export function createBucket(bucket) {
  return { type: CREATE, bucket }
}

export function removeBucket(bucket_id) {
  return { type: REMOVE, bucket_id }
}

export function completeBucket(bucket_id) {
  return { type: COMPLETE, bucket_id }
}

export function loadingToFalse(loading) {
  return { type: LOADING, loading }
}

// middlewares
export const loadBucketFB = () => {
  return async function (dispatch) {
    const bucket_data = await getDocs(collection(db, 'bucket'))

    let bucket_list = []
    bucket_data.forEach((doc) => {
      bucket_list.push({ id: doc.id, ...doc.data() })
    })

    dispatch(loadBucket(bucket_list))
  }
}

export const addBucketFB = (bucket) => {
  return async function (dispatch) {
    dispatch(loadingToFalse(false))
    const docRef = await addDoc(collection(db, 'bucket'), bucket)
    const bucket_data = { id: docRef.id, ...bucket }
    dispatch(createBucket(bucket_data))
  }
}

export const updateBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, 'bucket', bucket_id)
    await updateDoc(docRef, { completed: true })
    const _bucket_list = getState().bucketReducer.list
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id
    })
    dispatch(completeBucket(bucket_index))
  }
}

export const deleteBucketFB = (bucket_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, 'bucket', bucket_id)
    await deleteDoc(docRef)
    const _bucket_list = getState().bucketReducer.list
    const bucket_index = _bucket_list.findIndex((b) => {
      return b.id === bucket_id
    })
    dispatch(removeBucket(bucket_index))
  }
}

// Reducer
export default function bucketReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, is_loaded: action.loading }
    case LOAD:
      return { list: action.bucket_list, is_loaded: true }

    case CREATE:
      const new_bucket_list = [...state.list, action.bucket]
      return { ...state, list: new_bucket_list, is_loaded: true }

    case COMPLETE:
      let complete_bucket_list = state.list.map((el, i) =>
        i === action.bucket_id ? { ...el, completed: true } : el
      )
      return { ...state, list: complete_bucket_list }

    case REMOVE:
      let remove_bucket_list = state.list.filter(
        (el, i) => i !== action.bucket_id
      )
      return { ...state, list: remove_bucket_list }
    // do reducer stuff
    default:
      return state
  }
}
