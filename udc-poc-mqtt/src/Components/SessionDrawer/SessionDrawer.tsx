import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Flex,
    useDisclosure,
    Center,
} from '@chakra-ui/react';
import './sessionDrawer.css'
import SessionEvents from './SessionEvents';
import SessionChat from './SessionChat';
import SessionParticipants from './SessionParticipants';

interface SessionDrawerProps {
    sessionDetails: any
}

export default function SessionDrawer({ sessionDetails }: SessionDrawerProps) {
    enum DrawerViews {
        SessionLogs,
        SessionParticipants,
        SessionChat
    }
    const [innerView, setInnerView] = React.useState<DrawerViews>(DrawerViews.SessionLogs)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sessionMessages, setSessionMessages] = React.useState<string[]>([]);
    return (
        <>
            <i className="bi bi-list" onClick={onOpen} style={{ fontSize: "1.5rem", color: "#bee3f8" }}></i>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={() => {
                    console.log(sessionMessages)
                    onClose()
                }}
            >
                <DrawerOverlay />
                <DrawerContent bg="gray.700" color="gray.500" height="100%" overflow="hidden">
                    <DrawerCloseButton />
                    <DrawerHeader>Unicorn Digital Courtroom</DrawerHeader>

                    <DrawerBody>
                        <Center>
                            <div className="fakeSwitch">
                                <button className={innerView === DrawerViews.SessionLogs ? "selectedView" : 'unselectedView'} onClick={() => setInnerView(DrawerViews.SessionLogs)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z" />
                                    </svg>
                                </button>
                                <button className={innerView === DrawerViews.SessionChat ? "selectedView" : 'unselectedView'} onClick={() => setInnerView(DrawerViews.SessionChat)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                </button>
                                <button className={innerView === DrawerViews.SessionParticipants ? "selectedView" : 'unselectedView'} onClick={() => setInnerView(DrawerViews.SessionParticipants)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                    </svg>
                                </button>
                            </div>
                        </Center>
                        <Flex flexDirection="column" flexGrow={1} width="100%" alignItems="center" p="1rem 0" height="96%" overflow="hidden">
                            {innerView === DrawerViews.SessionLogs && <SessionEvents logs={sessionDetails.sessionEventLogs} />}
                            {innerView === DrawerViews.SessionChat && <SessionChat SessionMessages={sessionDetails.sessionChatLogs} setSessionMessages={setSessionMessages} />}
                            {innerView === DrawerViews.SessionParticipants && <SessionParticipants participantsList={sessionDetails.sessionParticipants} />}
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
