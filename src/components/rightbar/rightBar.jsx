import Image from "next/image";

export const RightBar = () => {
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <Image
                alt="right"
                src="https://images.pexels.com/photos/3343253/pexels-photo-3343253.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <span>John Doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <Image
                alt="right"
                src="https://images.pexels.com/photos/3343253/pexels-photo-3343253.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <span>John Doe</span>

              <span>Published a new article</span>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <Image
                alt="right"
                src="https://images.pexels.com/photos/3343253/pexels-photo-3343253.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <span>John Doe</span>
              <span>Posted a Status</span>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <Image
                alt="right"
                src="https://images.pexels.com/photos/3343253/pexels-photo-3343253.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <span>John Doe</span>
              <span>Liked an article</span>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <Image
                alt="right"
                src="https://images.pexels.com/photos/3343253/pexels-photo-3343253.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <span>John Doe</span>
              <div className="online"></div>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <Image
                alt="right"
                src="https://images.pexels.com/photos/3343253/pexels-photo-3343253.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <span>Jane Doe</span>
              <div className="online"></div>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <Image
                alt="images"
                src="https://images.pexels.com/photos/3343253/pexels-photo-3343253.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <span>Son Doe</span>
              <div className="online"></div>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <Image
                alt="images"
                src="https://images.pexels.com/photos/3343253/pexels-photo-3343253.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
              <span>Daughter Doe</span>
              <div className="online"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
