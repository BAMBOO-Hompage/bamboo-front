import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Nav from '../../components/nav.tsx';
import PostData from '../../mockup_data/post_data.tsx';
import '../../App.css';

export default function Post() {
    const data = PostData();

    const postId = localStorage.getItem('postId');
    const currentPost = data.filter((post) => postId == post.id)[0];

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
                            width: '300px',
                            borderRight: '1px solid #444',
                            fontFamily: 'Pretendard-Bold',
                            fontSize: '28px',
                            color: '#fff',
                            textAlign: 'left',
                        }}
                    >
                        <div style={{ position: 'absolute', right: '50px' }}>
                            공지사항
                            <div
                                style={{
                                    marginTop: '40px',
                                    fontFamily: 'Pretendard-Regular',
                                    fontSize: '16px',
                                }}
                            >
                                <div
                                    className="post_tabs"
                                    onClick={() => {
                                        window.location = '/postBoard';
                                    }}
                                >
                                    목록으로
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
                        style={{
                            position: 'relative',
                            width: '80%',
                            heidht: '100%',
                            textAlign: 'left',
                        }}
                    >
                        <div style={{ width: '70%', position: 'absolute', left: '60px' }}>
                            <div
                                style={{
                                    marginBottom: '15px',
                                    fontFamily: 'Pretendard-SemiBold',
                                    fontSize: '18px',
                                    color: '#2CC295',
                                }}
                            >
                                {currentPost.category}
                            </div>
                            <div
                                style={{
                                    marginBottom: '15px',
                                    fontFamily: 'Pretendard-SemiBold',
                                    fontSize: '28px',
                                    color: '#fff',
                                }}
                            >
                                {currentPost.title}
                            </div>
                            <div
                                style={{
                                    marginBottom: '100px',
                                    fontFamily: 'Pretendard-Light',
                                    fontSize: '16px',
                                    color: '#fff',
                                }}
                            >
                                작성 일자 : {currentPost.date}
                            </div>
                            <div
                                style={{
                                    marginBottom: '15px',
                                    fontFamily: 'Pretendard-Light',
                                    fontSize: '16px',
                                    color: '#fff',
                                }}
                            >
                                {currentPost.content.replace(/(?:\r\n|\r|\n)/g, '<br>')}
                            </div>
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
