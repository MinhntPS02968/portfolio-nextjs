import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./auth";
import parser from "socket.io-msgpack-parser";

interface State {
  socketIO: Socket | null;
}

type Actions = {
  socketInit: () => Socket | null;
  connectSocket: () => void;
};

export const useSocketIOStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      socketIO: null,
      socketInit() {
        const { token } = useAuthStore.getState();

        const socketIO = get().socketIO;

        if (!socketIO || !socketIO.connected) {
          const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "", {
            parser: parser,
            transports: ["websocket"],
            forceNew: true,
            auth: {
              token: token,
            },
          });

          newSocket.emit("join_client", "public_room");
          newSocket.on("disconnect", async () => {
            newSocket.emit("join_client", "public_room");
          });

          set({ socketIO: newSocket });
          return newSocket;
        }
        return socketIO;
      },
      connectSocket() {
        const socketIO = get().socketIO;
        if (socketIO) {
          socketIO.connect();
          socketIO.emit("join_client", "public_room");
        }
      },
    }),
    {
      name: "socket-io-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({}),
    }
  )
);
