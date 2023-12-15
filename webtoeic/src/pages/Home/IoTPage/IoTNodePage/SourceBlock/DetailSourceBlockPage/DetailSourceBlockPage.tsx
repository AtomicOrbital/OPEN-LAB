import React, { Fragment, useEffect, useState } from 'react'
import Header from '../../../../../../components/Header/Header'
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../../../../../redux/configStore'
import { fetchBaiIoTDetail } from '../../../../../../redux/BaiIoT/BaiIoTReducer'
import { CommentGrammar, addComment, fetchComments } from '../../../../../../redux/CommentBaiIoT/CommentBaiKhoiNguon'
import { settings } from '../../../../../../util/config'
import { GrammarWithVideoResponse, fetchVideoByBaiGrammarId } from '../../../../../../redux/VideoGrammar/VideoGrammarReducer'
import { Button } from 'antd'
import VideoGammarModal from './VideoGammarModal'

export interface DetailSourceBlockPage {
    id: number | null;
}



const DetailSourceBlockPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = Number(queryParams.get('idKhoiNguon'));
    const [commentContent, setCommentContent] = useState('');
    const [videos, setVideos] = useState<any>([]);
    const dispatch = useDispatch<DispatchType>();

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(event.target.value);
        setCommentContent(event.target.value);
    }



    const comments = useSelector((state: RootState) => state.CommentBaiKhoiNguon.comments);
    const videoList = useSelector((state: RootState) => state.VideoGrammarReducer.video);

    useEffect(() => {
        if (id) {
            dispatch(fetchVideoByBaiGrammarId(id));
        }
    }, [dispatch, id])

    useEffect(() => {
        if (videoList) {
            setVideos(videoList);
        }

    }, [videoList])

    console.log("videoList", videoList);

    const userId = useSelector((state: RootState) => state.UserReducer.userId);
    const email = useSelector((state: RootState) => state.UserReducer.email);

    console.log("comments", comments);
    console.log("userId", userId);
    const handleSubmitComment = () => {
        if (userId) {
            dispatch(addComment({
                cmtGrammarContent: commentContent,
                userId: userId,
                baiGrammarId: id

            }));
            setCommentContent('');
            dispatch(fetchBaiIoTDetail(id));
        } else {
            console.error('Cannot determine the user ID.');
        }
    }


    const currentItem = useSelector((state: RootState) => state.BaiIoTReducer.currentItem);
    useEffect(() => {
        dispatch(fetchBaiIoTDetail(id));
    }, [dispatch, id])
    useEffect(() => {
        dispatch(fetchComments(id));
    }, [dispatch, id])

    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <Fragment>
            <Header />
            <div className="container" style={{ marginTop: '120px' }}>
                <div className="row">
                    <div className="col-10">
                        {currentItem && (
                            <div>
                                <h4 className="mb-4 text-center">{currentItem.tenBaiGrammar}</h4>
                                <div dangerouslySetInnerHTML={{ __html: currentItem.contentHTML || '' }}></div>
                            </div>
                        )}
                    </div>
                    <div className="col-2">
                        <Button onClick={showModal}>Danh sách video</Button>
                        <VideoGammarModal
                            videos={videos}
                            isOpen={modalOpen}
                            onClose={closeModal}
                        />
                        <NavLink to="/home/IoT/Node/source_block/detailKhoiNguon/practiceSourceBlock" className='mt-2'>
                            <Button className='mt-3'>Vào làm bài</Button>
                        </NavLink>
                    </div>
                </div>

                <div className="d-flex justify-content-start align-items-start mb-5" style={{ marginLeft: 20 }}>
                    <div style={{ width: '700px', borderRadius: '12px' }}>
                        <div className="comments-section">
                            {comments.map((comment: CommentGrammar, index: number) => (
                                <div key={index} className="comment">
                                    <strong className="d-block mb-2">{comment.user?.email}</strong>
                                    <textarea
                                        key={index}
                                        style={{
                                            height: '100px',
                                            borderColor: '#ED64A6',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.875rem',
                                            padding: '0.25rem 0.75rem',
                                            cursor: 'not-allowed',
                                            resize: 'none'
                                        }}
                                        value={comment.cmtgrammarcontent}
                                        className="form-control read-only-textarea"
                                        readOnly
                                    />
                                </div>
                            ))}
                        </div>

                        <textarea
                            value={commentContent}
                            onChange={handleCommentChange}
                            className="form-control mb-3 mt-5"
                            style={{
                                height: '160px',
                                borderColor: '#ED64A6',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                padding: '0.25rem 0.75rem'
                            }}
                            placeholder="Add your comments here">
                        </textarea>

                        <div className="d-flex justify-content-between">
                            <button
                                onClick={handleSubmitComment}
                                className="btn text-white"
                                style={{ backgroundColor: '#3B82F6', width: '150px', borderRadius: '0.5rem' }}>Submit comment</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default DetailSourceBlockPage;