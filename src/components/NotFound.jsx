import { useNavigate } from 'react-router'

const NotFound = () => {
  let navigate = useNavigate()
  return (
    <>
      <h1>주소가 올바르지 않아요!</h1>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
    </>
  )
}
export default NotFound
