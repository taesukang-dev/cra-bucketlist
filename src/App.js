import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router'
import styled from 'styled-components'

import BucketList from './components/BucketList'
import Detail from './components/Detail'
import NotFound from './components/NotFound'
import Progress from './components/Progress'
import Spinner from './components/Spinner'

import { addBucketFB, loadBucketFB } from './redux/modules/bucket'
// import { db } from './firebase'
// import { collection, addDoc } from 'firebase/firestore'

function App() {
  const text = useRef('')
  const dispatch = useDispatch()
  const is_loaded = useSelector((state) => state.bucketReducer.is_loaded)
  useEffect(() => {
    dispatch(loadBucketFB())
  }, [dispatch])
  return (
    <div className="App">
      <Container>
        <Title>내 버킷리스트</Title>
        <Progress />
        <Line />

        <Routes>
          <Route path="/" element={<BucketList />} />
          <Route path="/Detail/:id" element={<Detail />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>

      <Input>
        <input type="text" ref={text} />
        <button
          onClick={() => {
            dispatch(
              addBucketFB({ text: text.current.value, completed: false })
            )
          }}
        >
          추가하기
        </button>
      </Input>
      {!is_loaded && <Spinner />}
    </div>
  )
}

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  & > * {
    padding: 5px;
  }
  & input {
    border: ipx solid #888;
    width: 70%;
    margin-right: 10px;
  }
  & input:focus {
    outline: none;
    border: 1px solid #a673ff;
  }
  & button {
    width: 25%;
    color: #fff;
    border: #a673ff;
    background: #a673ff;
  }
`

export default App
