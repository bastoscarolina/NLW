export interface MailAdapter{
    sendMail:(data: SendEmailData)=> Promise<void>
}

export interface SendEmailData{
    subject: string;
    body: string
}