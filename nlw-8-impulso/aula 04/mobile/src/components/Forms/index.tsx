import { ArrowLeft } from 'phosphor-react-native';
import React , {useState} from 'react';
import {captureScreen} from 'react-native-view-shot'
import { View , TextInput, Image, Text, TouchableOpacity} from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import {FeedbackType} from '../Widget'
import {Screenshot} from '../Screenshot'
import {Button} from '../Button'
import {feedbackTypes} from '../../utils/feedbackTypes'
import { api } from '../../libs/api';
import * as FileSystem from 'expo-file-system'

interface Props{
    feedbackType: FeedbackType,
    onFeedbackCanceled: ()=> void,
    onFeedbackSent: ()=> void
}
export function Forms({feedbackType, onFeedbackCanceled,onFeedbackSent}:Props) {
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const [screenshot,setScreenshot]=useState<string | null> (null)
    const feedbackTypeInfo = feedbackTypes[feedbackType]
    const [comment,setComment]= useState("")

    function handleScreenshot(){
        captureScreen({
            format:'jpg',
            quality:0.8
        })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error))
    }
    function handleScreenshotRemove(){
        setScreenshot(null)
    }

    async function handleSendFeedback(){
       if(isSendingFeedback){
           return
       }
       setIsSendingFeedback(true)
       const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot,{encoding:'base64'})
       try{
            await api.post('/feedbacks',{
                type:feedbackType,
                comment,
                screenshot:`data:image/png;base64, ${screenshotBase64}`
            })
            onFeedbackSent()
       }catch(error){
           console.log(error)
           setIsSendingFeedback(false)
       }
    }
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCanceled}>
                <ArrowLeft
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}/>
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Image
                    source={feedbackTypeInfo.image}
                    style={styles.image}/>
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>
        </View>

        <TextInput
            multiline
            style={styles.input}
            placeholder="Algo n??o est?? funcionando bem? Queremos corrigir. Conte com detalhes o que est?? acontecendo."
            placeholderTextColor={theme.colors.text_secondary}
            autoCorrect={false}
            onChangeText={setComment}
            />
        <View style={styles.footer}>
            <Screenshot
                screenshot={screenshot}               
                onRemoveShot={handleScreenshotRemove}
                onTakeShot={handleScreenshot}
            />
            <Button 
            onPress={handleSendFeedback}
            isLoading={isSendingFeedback}
            />
        </View>
    </View>
  );
}