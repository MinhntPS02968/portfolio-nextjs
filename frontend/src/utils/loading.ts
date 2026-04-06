import { Loading } from "notiflix/build/notiflix-loading-aio";

export class LoadingNotiflix {
  static show(msg: string = "Loading...") {
    Loading.standard(msg, {
      svgColor: "rgba(255, 225, 0, 0.5)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    });
  }
  static hide() {
    Loading.remove();
  }
}
