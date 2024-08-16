import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from '../../components/nav.tsx';
import Button from '../../components/button.tsx';
import PostData from '../../mockup_data/post_data.tsx';
import '../../App.css';

const postsPerPage = 9;
const maxVisiblePages = 5;

export default function PostBoard() {
    const [postList, setPostList] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const scrollPositions = useRef({});
    const data = PostData();

    const filteredData = data.filter((post) => postList === '전체' || post.category === postList);

    const totalPages = Math.ceil(filteredData.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToDisplay = filteredData.slice(startIndex, endIndex);

    const startPage = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    const changePage = (page) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);

        document.getElementById('background').scrollTo({ top: 0, behavior: 'smooth' });
    };

    useLayoutEffect(() => {
        const scrollY = sessionStorage.getItem('scrollY');
        const postList = sessionStorage.getItem('postList');
        const currentPage = sessionStorage.getItem('currentPage');

        if (scrollY) {
            document.getElementById('background').scrollTo({ top: scrollY, behavior: 'auto' });
            sessionStorage.removeItem('scrollY');
        }

        if (postList) {
            setPostList(postList);
            sessionStorage.removeItem('postList');
        }

        if (currentPage) {
            setCurrentPage(parseInt(currentPage, 10));
            sessionStorage.removeItem('currentPage');
        }
    }, []);

    return (
        <div>
            <Nav type="community" />
            <div id="background" className="background">
                <div style={{ height: '200vh', display: 'flex', padding: '100px 0' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{
                            ease: 'easeInOut',
                            duration: 0.5,
                            y: { duration: 0.5 },
                        }}
                        style={{
                            position: 'relative',
                            width: '30%',
                            borderRight: '1px solid #444',
                            fontFamily: 'Pretendard-Bold',
                            fontSize: '28px',
                            color: '#fff',
                            textAlign: 'left',
                        }}
                    >
                        <div style={{ position: 'absolute', right: '50px' }}>
                            게시판
                            <div
                                style={{
                                    marginTop: '40px',
                                    fontFamily: 'Pretendard-Regular',
                                    fontSize: '16px',
                                }}
                            >
                                <div
                                    className="post_tabs"
                                    style={postList === '전체' ? { color: '#2CC295' } : {}}
                                    onClick={() => {
                                        setPostList('전체');
                                        setCurrentPage(1);
                                    }}
                                >
                                    전체
                                </div>

                                <div
                                    className="post_tabs"
                                    style={postList === '대회 및 세미나' ? { color: '#2CC295' } : {}}
                                    onClick={() => {
                                        setPostList('대회 및 세미나');
                                        setCurrentPage(1);
                                    }}
                                >
                                    대회 및 세미나
                                </div>
                                <div
                                    className="post_tabs"
                                    style={postList === '동아리 공지' ? { color: '#2CC295' } : {}}
                                    onClick={() => {
                                        setPostList('동아리 공지');
                                        setCurrentPage(1);
                                    }}
                                >
                                    동아리 공지
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{
                            ease: 'easeInOut',
                            duration: 0.5,
                            y: { duration: 0.5 },
                        }}
                        key={postList}
                        style={{
                            position: 'relative',
                            width: '70%',
                            heidht: '100%',
                            textAlign: 'left',
                        }}
                    >
                        <div style={{ width: '70%', position: 'absolute', left: '50px' }}>
                            <div
                                style={{
                                    width: '100%',
                                    fontFamily: 'Pretendard-Bold',
                                    fontSize: '28px',
                                    color: '#fff',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                {postList === '전체' ? (
                                    <div>전체</div>
                                ) : postList === '대회 및 세미나' ? (
                                    <div>대회 및 세미나</div>
                                ) : (
                                    <div>동아리 공지</div>
                                )}
                                <div>
                                    <Button
                                        type="primary"
                                        size="small"
                                        title="새 글 작성"
                                        onClick={() => {
                                            window.location = '/postAdd';
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ margin: '35px 0' }}>
                                {postsToDisplay.map((post) => (
                                    <div
                                        key={post.id}
                                        style={{
                                            width: '100%',
                                            height: '120px',
                                            backgroundColor: '#222',
                                            border: '0.5px solid #343434',
                                            borderRadius: '30px',
                                            marginBottom: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div style={{ width: '90%', margin: '0 auto' }}>
                                            <Link
                                                to="/post"
                                                style={{ textDecoration: 'none' }}
                                                onClick={() => {
                                                    sessionStorage.setItem(
                                                        'scrollY',
                                                        document.getElementById('background').scrollTop
                                                    );
                                                    sessionStorage.setItem('postList', postList);
                                                    sessionStorage.setItem('currentPage', currentPage);
                                                    localStorage.setItem('postId', post.id);
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        marginBottom: '5px',
                                                        fontFamily: 'Pretendard-Regular',
                                                        fontSize: '15px',
                                                        color: '#2CC295',
                                                    }}
                                                >
                                                    {post.category}
                                                </div>
                                                <div
                                                    style={{
                                                        marginBottom: '5px',
                                                        fontFamily: 'Pretendard-SemiBold',
                                                        fontSize: '18px',
                                                        color: '#fff',
                                                    }}
                                                >
                                                    {post.title}
                                                </div>
                                                <div
                                                    style={{
                                                        fontFamily: 'Pretendard-Regular',
                                                        fontSize: '15px',
                                                        color: '#888',
                                                    }}
                                                >
                                                    작성일자 : {post.date}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                width: '70%',
                                position: 'absolute',
                                left: '50px',
                                bottom: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <button className="bottom_tabs" onClick={() => changePage(1)}>
                                {'<<'}
                            </button>
                            <button className="bottom_tabs" onClick={() => changePage(currentPage - 1)}>
                                {'<'}
                            </button>
                            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                                <button
                                    key={page}
                                    className="bottom_tabs"
                                    onClick={() => changePage(page)}
                                    style={
                                        page === currentPage
                                            ? { textShadow: '0 0 0.1em, 0 0 0.1em', color: '#2CC295' }
                                            : {}
                                    }
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="bottom_tabs" onClick={() => changePage(currentPage + 1)}>
                                {'>'}
                            </button>
                            <button className="bottom_tabs" onClick={() => changePage(totalPages)}>
                                {'>>'}
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div
                    style={{
                        width: '100vw',
                        height: '150px',
                        backgroundColor: '#2CC295',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div></div>
                </div>
            </div>
        </div>
    );
}
