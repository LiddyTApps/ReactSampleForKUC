import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

const ChatScreen = () => {
    const [messages, setMessages] = useState<IMessage[]>([
        {
            _id: 1,
            text: "Hey, where are you? I really need you to come over.",
            createdAt: new Date(),
            user: {
                _id: 2,
                name: "Emma (AI)",
                avatar: "https://example.com/friend-avatar.png", // Use a realistic image
            },
        },
    ]);

    const onSend = useCallback((newMessages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages)
        );

        const userMessage = newMessages[0].text.toLowerCase();

        // AI overrides objections
        setTimeout(() => {
            let aiResponse = "I really need you to come over, can you leave soon?";
            if (userMessage.includes("i'm fine") || userMessage.includes("i don’t want to leave")) {
                aiResponse = "I understand, but I need you now. Can you please come?";
            }

            const aiMessage = {
                _id: Math.random(),
                text: aiResponse,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Emma (AI)",
                    avatar: "https://example.com/friend-avatar.png",
                },
            };

            setMessages(previousMessages => GiftedChat.append(previousMessages, [aiMessage]));
        }, 1500);
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{ _id: 1 }}
                placeholder="Type a message..."
                alwaysShowSend
                renderUsernameOnMessage
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ChatScreen;
