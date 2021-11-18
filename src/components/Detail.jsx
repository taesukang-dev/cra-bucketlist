import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import Button from '@material-ui/core/Button'
import { deleteBucketFB, updateBucketFB } from '../redux/modules/bucket'

const Detail = () => {
  let bucket_list = useSelector((state) => state.bucketReducer.list)
  const bucket_params = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
      <h1>
        {bucket_list[bucket_params].text ? bucket_list[bucket_params].text : ''}
      </h1>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          dispatch(updateBucketFB(bucket_list[bucket_params].id))
          navigate(-1)
        }}
      >
        완료하기
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          dispatch(deleteBucketFB(bucket_list[bucket_params].id))
          navigate(-1)
        }}
      >
        삭제하기
      </Button>
    </>
  )
}

export default Detail
