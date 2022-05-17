import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repositories";

interface SubmitFeedbackUseCaseRequest {
    type:string;
    comment:string;
    screenshot?: string;
}
export class SubmitFeedbackUseCase{
    
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){
        this.feedbacksRepository= feedbacksRepository
    }

    async handle({type, comment, screenshot}: SubmitFeedbackUseCaseRequest){

        if(!type){
            throw new Error('Type is required')
        }

        if(!comment){
            throw new Error('Comment is required')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format')
        }
        // const {type, comment, screenshot} = req.body;
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body:[
                `<p>tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : ""
            ].join('\n')
        })
    }
}