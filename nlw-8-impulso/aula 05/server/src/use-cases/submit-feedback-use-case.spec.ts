import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

//spies permitem que vc monitore se alguma função foi chamada
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
)

describe('Submit feedback',  ()=>{
    it('should be able to submit a feedback', async()=>{

        await expect(submitFeedback.handle({
            type:"BUG",
            comment:"example",
            screenshot:'data:image/png;base64'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('should not be able to submit a feedback without a type', async()=>{

        await expect(submitFeedback.handle({
            type:"",
            comment:"example",
            screenshot:'data:image/png;base64'
        })).rejects.toThrow();
    })

    it('should not be able to submit a feedback without a comment', async()=>{

        await expect(submitFeedback.handle({
            type:"BUG",
            comment:"",
            screenshot:'data:image/png;base64'
        })).rejects.toThrow();
    })

    it('should not be able to submit a feedback with an invalid screenshot', async()=>{

        await expect(submitFeedback.handle({
            type:"BUG",
            comment:"test",
            screenshot:'test.png'
        })).rejects.toThrow();
    })
})