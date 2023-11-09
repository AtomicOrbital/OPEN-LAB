// Tối ưu code bằng cách lắng nghe chỉ những thay đổi mới nhất và sử dụng ServerValue.TIMESTAMP của Firebase

import React, { useState, useEffect } from 'react';
import { Chat, Message as ChatMessage, FileMessage, MessageType } from 'react-chat-module';
import 'react-chat-module/dist/index.css';

import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { database, storage } from '../../util/firebase';
import { SendMessage } from 'react-chat-module/dist/SendMessage';
import { ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
export interface Message {
    messageId: string;
    senderId: number;
    profilePicture?: string;
    name?: string;
    photo?: string;
    video?: string;
    type: MessageType;
    text?: string;
    content?: string;
    createdAt: Date | null;
    read: boolean;
    attachemnt?: File;
    file?: FileMessage;
    audio?: string;
}

declare module "react-chat-module" {
    export interface MessageTypeMap {
        image: "image";
        video: "video";
        test: "test";
        // thêm các loại tin nhắn khác ở đây nếu cần
    }
}

const MessageContent = ({ message }: any) => {
    console.log("asdasdss")
    switch (message.type) {
        case 'image':
            return <img src={message.content} alt="Sent content" />;
        case 'video':
            return (
                <video controls>
                    <source src={message.content} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        case 'file':
            // Assuming 'content' contains the URL to the file
            return <div {...{
                onClick: () => console.log("abcasddadadaadaadasdadas")
            }}>
                <a href={message.content} target="_blank" download="desired-filename.extension">Download File</a>
            </div>;
        default:
            return <p>{message.text}</p>; // text messages
    }
};

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesRef = ref(database, 'messages');

    const userId = useSelector((state: RootState) => state.UserReducer.userId) as any;
    console.log("userId", userId);



    useEffect(() => {
        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const newMessages: Message[] = [];
            snapshot.forEach(childSnapshot => {
                const firebaseMessage = childSnapshot.val();
                newMessages.push({
                    messageId: childSnapshot.key!,
                    ...firebaseMessage,
                    createdAt: firebaseMessage.createdAt ? new Date(firebaseMessage.createdAt) : null,
                });
            });
            console.log("newMessages", newMessages); // Log để kiểm tra dữ liệu
            setMessages(newMessages);
        });

        return () => unsubscribe();
    }, []);


    const sendMessage = (contentUrl: string, contentType: string) => {
        const message = {
            senderId: userId,
            profilePicture: "https://via.placeholder.com/150",
            type: contentType,
            content: contentUrl,
            read: false,
        };


        push(messagesRef, message);
    };

    const handleFileUpload = (file: File): Promise<{ url: string; type: string }> => {
        return new Promise((resolve, reject) => {
            const storagePath = `${file.name}`;
            const fileRef = storageRef(storage, storagePath);
            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Xử lý tiến trình tải lên nếu cần
                },
                (error) => {
                    // Xử lý lỗi tải lên
                    reject(error);
                },
                () => {
                    // Tải lên thành công, lấy URL và trả về
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        let type = 'file'; // default to file
                        if (file.type.startsWith('image/')) {
                            type = 'image';
                        } else if (file.type.startsWith('video/')) {
                            type = 'video';
                        } else if (file.type.startsWith('audio/')) {
                            type = 'audio';
                        }
                        resolve({ url: downloadURL, type });
                    }).catch(reject);
                }
            );
        });
    };


    const handleSend = async (newMessage: ChatMessage) => {
        if (newMessage.attachment) {
            const file = newMessage.attachment;
            try {
                const { url, type } = await handleFileUpload(file);
                sendMessage(url, type);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            // Gửi tin nhắn văn bản thông thường
            const textMessageData = {
                senderId: userId,
                profilePicture: "https://via.placeholder.com/150",
                type: 'text',
                text: newMessage.text ?? '',
                createdAt: serverTimestamp(),
                read: false,
            };
            push(messagesRef, textMessageData);
        }
    };


    return (
        <Chat
            userId={userId}
            messages={messages.map((message: any) => ({
                ...message,
                createdAt: message.createdAt || new Date(),
                video: message.content,
                photo: message.content,
                file: message.content,
                audio: message.content,
                attachemnt: message.content,
                customFactories: <MessageContent message={messages} />
            }))}
            onSend={handleSend}

        />
    );
}
export default ChatComponent;
