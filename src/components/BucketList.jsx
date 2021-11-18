import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

const BucketList = (props) => {
  const my_lists = useSelector((state) => state.bucketReducer.list)
  const history = useNavigate()
  return (
    <ListStyle>
      {my_lists.map((list, index) => {
        return (
          <ItemStyle
            completed={list.completed}
            className="list_item"
            key={index}
            onClick={() => {
              history(`/Detail/${index}`)
            }}
          >
            {list.text}
          </ItemStyle>
        )
      })}
    </ListStyle>
  )
}

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  overflow-y: auto;
`

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  color: ${(props) => (props.completed ? '#fff' : '#333')};
  background-color: ${(props) => (props.completed ? '#a673ff' : 'aliceblue')};
`

export default BucketList
