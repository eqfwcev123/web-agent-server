import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

interface LearningSession {
  sessionId: string;
  userId: string;
  problemId: string;
  progress: number;
  currentStep: string;
}

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/learning',
})
export class LearningGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(LearningGateway.name);
  private activeSessions = new Map<string, LearningSession>();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    // Clean up session if needed
    this.activeSessions.delete(client.id);
  }

  @SubscribeMessage('join_session')
  handleJoinSession(
    @MessageBody()
    data: { sessionId: string; userId: string; problemId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const session: LearningSession = {
      sessionId: data.sessionId,
      userId: data.userId,
      problemId: data.problemId,
      progress: 0,
      currentStep: 'problem_analysis',
    };

    this.activeSessions.set(client.id, session);
    client.join(data.sessionId);

    this.logger.log(`User ${data.userId} joined session ${data.sessionId}`);

    client.emit('session_joined', {
      sessionId: data.sessionId,
      message: 'Successfully joined learning session',
    });
  }

  @SubscribeMessage('update_progress')
  handleUpdateProgress(
    @MessageBody() data: { sessionId: string; progress: number; step: string },
    @ConnectedSocket() client: Socket,
  ) {
    const session = this.activeSessions.get(client.id);
    if (session) {
      session.progress = data.progress;
      session.currentStep = data.step;

      // Broadcast progress update to all clients in the session
      this.server.to(data.sessionId).emit('progress_updated', {
        sessionId: data.sessionId,
        progress: data.progress,
        currentStep: data.step,
      });
    }
  }

  @SubscribeMessage('request_ai_help')
  handleAIHelpRequest(
    @MessageBody() data: { sessionId: string; question: string; code?: string },
    @ConnectedSocket() client: Socket,
  ) {
    const session = this.activeSessions.get(client.id);
    if (session) {
      // Emit acknowledgment
      client.emit('ai_help_requested', {
        sessionId: data.sessionId,
        message: 'AI is analyzing your request...',
      });

      // Here you would typically call your AI service
      // For now, we'll emit a mock response
      setTimeout(() => {
        client.emit('ai_response', {
          sessionId: data.sessionId,
          response: 'Here is some helpful guidance for your question...',
          suggestions: ['Try this approach', 'Consider this optimization'],
          timestamp: new Date().toISOString(),
        });
      }, 2000);
    }
  }

  @SubscribeMessage('submit_code')
  handleCodeSubmission(
    @MessageBody() data: { sessionId: string; code: string; language: string },
    @ConnectedSocket() client: Socket,
  ) {
    const session = this.activeSessions.get(client.id);
    if (session) {
      // Emit code submission acknowledgment
      client.emit('code_submitted', {
        sessionId: data.sessionId,
        message: 'Code submitted for analysis',
      });

      // Here you would typically call your code execution service
      // For now, we'll emit a mock response
      setTimeout(() => {
        client.emit('code_analysis_result', {
          sessionId: data.sessionId,
          result: {
            passed: true,
            testResults: [],
            feedback: 'Great job! Your solution looks correct.',
          },
          timestamp: new Date().toISOString(),
        });
      }, 3000);
    }
  }

  // Method to emit AI responses from external services
  emitAIResponse(sessionId: string, response: any) {
    this.server.to(sessionId).emit('ai_response', response);
  }

  // Method to emit code execution results from external services
  emitCodeResult(sessionId: string, result: any) {
    this.server.to(sessionId).emit('code_analysis_result', result);
  }
}
