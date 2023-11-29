# soom
줌 클론 코딩 
using NodeJS, WebRTC and Websockets.

# npm init -y 
--> package.json 이 생성됨 이 파일에는 프로젝트의 기본 설정이 포함됩니다. 이 설정은 나중에 패키지 의존성 및 프로젝트에 관한 정보를 담고 있습니다.

npm: Node Package Manager의 약자로, JavaScript 패키지를 관리하고 배포하는 도구입니다.
init: 프로젝트 초기화 명령어입니다.
-y 또는 --yes: 사용자에게 대화형 입력 없이 기본 설정으로 프로젝트를 초기화하라는 옵션입니다.




# npm i nodemon -D 
--> 서버를 만듬 nodemon이라는 개발 의존성(dependency)을 설치하는 명령어. package.json 파일의 devDependencies 부분에 추가되며, 이후에 개발 서버를 실행할 #때 nodemon을 사용할 수 있게 됩니다.

npm: Node Package Manager의 약자로, JavaScript 패키지를 관리하고 배포하는 도구입니다.
i 또는 install: 패키지를 설치하는 명령어입니다.
nodemon: Node.js 애플리케이션을 개발할 때 소스 코드가 변경될 때마다 자동으로 서버를 다시 시작해주는 도구입니다. 이를 통해 코드 변경 사항을 빠르게 확인할 수 있습니다.
-D 또는 --save-dev: 이 옵션은 해당 패키지를 개발 의존성으로 설치한다는 것을 나타냅니다. 개발 의존성은 프로젝트를 개발할 때만 필요하고, 실제 운영 환경에서는 필요하지 않은 패키지입니다.

# npm i @babel/core @babel/cli @babel/node @babel/preset-env -D

@babel/core: Babel의 핵심 모듈로, 코드 변환을 담당합니다.
@babel/cli: Babel 명령줄 인터페이스(Command Line Interface)를 제공해주는 패키지입니다. 이를 통해 명령줄에서 Babel을 사용할 수 있습니다.
@babel/node: Node.js에서 ES6+ 문법을 사용할 수 있게 해주는 Babel 모듈입니다. @babel/cli와 함께 사용되어 개발 서버 또는 스크립트를 실행할 때 Babel을 사용할 수 있게 합니다.
@babel/preset-env: 프로젝트에서 사용하는 JavaScript 버전에 따라 필요한 Babel 플러그인과 프리셋을 동적으로 결정해주는 Babel 프리셋입니다. 이를 통해 프로젝트의 환경에 맞게 코드를 변환할 수 있습니다.

-D 또는 --save-dev: 이 옵션은 해당 패키지들을 개발 의존성으로 설치한다는 것을 나타냅니다. 개발 의존성은 프로젝트를 개발할 때만 필요하고, 실제 운영 환경에서는 필요하지 않은 패키지입니다.
실행된 명령어를 통해 이러한 Babel 관련 패키지들이 프로젝트의 package.json 파일의 devDependencies 부분에 추가되며, 이후에 프로젝트에서 Babel을 사용하여 JavaScript 코드를 변환할 수 있습니다. 


express 설치 
express : Node.js 환경에서 API 서버를 개발할 때 사용할 수 있는 웹 프레임워크

// ignore  -> public 폴더 내부의 코드가 변할 때 서버가 재시작되지 않도록 작성 (nodemon은 코드변화를 감지해서 서버를 재시작하는 기능이 있어서)

실시간 기능 구현 : 웹 소켓

실시간 채팅, 알람

http 서버 : 사용자에게 뷰 엔진을 이용해 만든 뷰, 정적 파일, 리다이렉션 제공
웹소켓 서버 : 실시간 채팅 기능

ws로 했던 것들을 소켓으로 대신 처리


