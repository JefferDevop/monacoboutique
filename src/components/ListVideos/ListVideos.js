import ReactPlayer from "react-player";

import styles from "./ListVideos.module.scss";

export function ListVideos({ videos }) {


  return (
    <div className={styles.video}>
      <h1>Videos</h1>

      <div className={styles.list}>
        {videos?.length > 0 &&
          videos.map((item, index) => (
            <div key={item.id} className={styles.card}>
              <ReactPlayer
                url={item.video_url}
                width="100%"               
                controls={true}
                playing={false}
                loop={false}
                volume={0.8}
                muted={false}
                style={{ border: "2px solid black" }}
                progressInterval={1000}
                playsinline={true}
                pip={false}
                stopOnUnmount={false}
                light={false}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
