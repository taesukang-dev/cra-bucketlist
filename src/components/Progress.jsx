import { useSelector } from 'react-redux'
import styled from 'styled-components'
const Progress = () => {
  const state = useSelector((state) => state.bucketReducer.list)
  let count = 0
  state.map((el) => (el.completed === true ? (count += 1) : count))
  return (
    <div>
      <ProgressBar>
        <HighLight width={(count / state.length) * 100 + '%'} />
        <Dot />
      </ProgressBar>
    </div>
  )
}

const ProgressBar = styled.div`
  background: #eee;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  border-radius: 10px;
`

const HighLight = styled.div`
  background: #673ab7;
  transition: 1s;
  width: ${(props) => props.width};
  height: 20px;
  border-radius: 10px;
`

const Dot = styled.div`
  width: 40px;
  height: 40px;
  background: #fff;
  border: 5px solid #673ab7;
  border-radius: 50%;
  margin: 0px 0px 0px -20px;
`

export default Progress
