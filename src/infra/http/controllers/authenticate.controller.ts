import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private authenticateStudent: AuthenticateStudentUseCase,
    private jwt: JwtService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({ email, password })

    if (result.isLeft()) {
      throw new Error()
    }

    const { accessToken } = result.value

    return { access_token: accessToken }
  }
}
