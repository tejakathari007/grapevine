import { Text, Box, Flex, Spinner, Pressable } from 'native-base';
import React, { useEffect, useState, useMemo } from 'react';
import { grapevineBackend } from '../../API';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { RoundImage } from '../../AtomComponents/index';
const Activity = ({ activity, navigation }) => {
  const [post, setPost] = useState(null);
  useEffect(() => {
    if (
      activity.type == 'like' ||
      activity.type == 'comment' ||
      activity.type == 'share'
    ) {
      grapevineBackend(
        '/post/getPostByUuid',
        { post_uuid: activity.action_uuid },
        'POST'
      )
        .then(({ data }) => {
          if (data.status) {
            setPost({ ...data.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [activity]);

  const time = useMemo(() => {
    const date1 = new Date(activity.created_at);
    const date2 = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // Calculating the no. of days between two dates
    const diffInDays = Math.floor(diffInTime / oneDay);

    const diffInMin = Math.floor(diffInTime / 60000);
    if (diffInMin < 1) return '0 m';
    else if (diffInMin < 60) return diffInMin + 'm';
    else if (diffInMin < 1140) return Math.floor(diffInMin / 60) + 'h';
    return `${diffInDays}d `;
  }, [activity]);
  if (activity.type == 'share') return <Text>Activity</Text>;
  switch (activity.type) {
    case 'post':
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('PostPage', {
              post_uuid: activity.action_uuid,
            })
          }
          py={2}
        >
          <Box
            flex='1'
            flexDirection={'row'}
            justifyContent={'flex-start'}
            alignItems='center'
          >
            <RoundImage
              size='35'
              image={require('../../../assets/Images/1.png')}
            />

            <Box pl={2} flex='1' flexDirection={'column'}>
              <Pressable
                onPress={() =>
                  navigation.navigate('FriendProfile', {
                    user_uuid: activity.user_uuid,
                  })
                }
              >
                <Text fontSize={16} fontWeight='800' fontFamily='bold'>
                  {activity.user.username}
                </Text>
              </Pressable>
              <Box
                flex='1'
                flexDirection='row'
                justifyContent='space-between'
                width='100%'
              >
                <Text fontFamily='light'>
                  uploaded a new <Text fontFamily='bold'>post.</Text>
                </Text>
                <Text color='gray.500' fontFamily='light'>
                  {time}
                </Text>
              </Box>
            </Box>
          </Box>
        </Pressable>
      );
    case 'like':
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('PostPage', {
              post_uuid: activity.action_uuid,
            })
          }
          py={2}
        >
          {post && (
            <Flex
              direction='row'
              justifyContent={'flex-start'}
              alignItems='center'
            >
              <RoundImage
                size='35'
                image={require('../../../assets/Images/1.png')}
              />

              <Box pl={2} display='flex' flexDirection={'column'} flex='1'>
                <Pressable
                  onPress={() =>
                    navigation.navigate('FriendProfile', {
                      user_uuid: activity.user_uuid,
                    })
                  }
                >
                  <Text fontSize={16} fontWeight='800' fontFamily='bold'>
                    {activity.user.username}
                  </Text>
                </Pressable>
                <Box
                  flex='1'
                  flexDirection={'row'}
                  justifyContent='space-between'
                >
                  <Box display='flex' flexDirection={'row'}>
                    <Text fontFamily='light'>liked</Text>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('FriendProfile', {
                          user_uuid: post.user_uuid,
                        })
                      }
                    >
                      <Text fontWeight={'800'} fontFamily='bold'>
                        {' ' + post.username + "'s "}
                      </Text>
                    </Pressable>
                    <Text fontFamily='bold'>post.</Text>
                  </Box>
                  <Text color='gray.500' fontFamily='light'>
                    {time}
                  </Text>
                </Box>
              </Box>
            </Flex>
          )}
        </Pressable>
      );
    case 'comment':
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('PostPage', {
              post_uuid: activity.action_uuid,
            })
          }
          py={2}
        >
          {post && (
            <Flex
              direction='row'
              justifyContent={'flex-start'}
              alignItems='center'
            >
              <RoundImage
                size='35'
                image={require('../../../assets/Images/1.png')}
              />

              <Box pl={2} display='flex' flexDirection='column' flex='1'>
                <Pressable
                  onPress={() =>
                    navigation.navigate('FriendProfile', {
                      user_uuid: activity.user_uuid,
                    })
                  }
                >
                  <Text fontSize={16} fontFamily='bold'>
                    {activity.user.username}
                  </Text>
                </Pressable>
                <Box
                  flex='1'
                  flexDirection={'row'}
                  justifyContent='space-between'
                >
                  <Box display='flex' flexDirection='row'>
                    <Text fontFamily='light'>commented on</Text>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('FriendProfile', {
                          user_uuid: post.user_uuid,
                        })
                      }
                    >
                      <Text fontWeight={'800'} fontFamily='bold'>
                        {' ' + post.username + "'s "}
                      </Text>
                    </Pressable>
                    <Text fontFamily='bold'>post.</Text>
                  </Box>
                  <Text color='gray.500' fontFamily='light'>
                    {time}
                  </Text>
                </Box>
              </Box>
            </Flex>
          )}
        </Pressable>
      );
    case 'share':
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('PostPage', {
              post_uuid: activity.action_uuid,
            })
          }
          py={2}
          px={5}
        >
          {post && (
            <Flex
              direction='row'
              justifyContent={'flex-start'}
              alignItems='center'
            >
              <RoundImage
                size='35'
                image={require('../../../assets/Images/1.png')}
              />

              <Box pl={2} display='flex' flexDirection='column' flex='1'>
                <Pressable
                  onPress={() =>
                    navigation.navigate('FriendProfile', {
                      user_uuid: activity.user_uuid,
                    })
                  }
                >
                  <Text fontSize={16} fontWeight='800'>
                    {activity.user.username}
                  </Text>
                </Pressable>
                <Box
                  flex='1'
                  flexDirection={'row'}
                  justifyContent='space-between'
                >
                  <Box display='flex' flexDirection='row'>
                    <Text> shared</Text>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('FriendProfile', {
                          user_uuid: post.user_uuid,
                        })
                      }
                    >
                      <Text fontWeight={'800'}>
                        {' ' + post.username + "'s "}
                      </Text>
                    </Pressable>
                    <Text>post.</Text>
                  </Box>
                  <Text color='gray.500'>{time}</Text>
                </Box>
              </Box>
            </Flex>
          )}
        </Pressable>
      );
    default:
      return <></>;
  }
};

export default Activity;
