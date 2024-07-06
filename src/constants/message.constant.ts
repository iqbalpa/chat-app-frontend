export interface MessageRequest {
	name: string;
	text: string;
	roomId: string;
	friendRoomId: string;
}
export interface MessageResponse {
	id: number;
	name: string;
	text: string;
	roomId: string;
	date: Date;
}
