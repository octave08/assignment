# assignment

이 프로젝트는 CRA typescript template을 기반으로 개발된 회원 정보 조회 프로그램입니다. [개발을 위한 proxy](https://github.com/octave08/assignment.git)가 적용되어 있어서 정상적인 테스트를 하기 위해서는 로컬에서 직접 프로젝트를 실행해야합니다.

지원하는 기능은 다음과 같습니다.

- 로그인
- 비밀번호 재설정
- 회원 정보 조회
- E2E 테스트

회원가입 기능은 별도로 구현되어 있지 않기 때문에 테스트 계정으로만 로그인할 수 있습니다

```
email:
PW:
```

또한, 비밀번호 재설정 과정에서 사용하는 인증코드 값 또한 하드 코딩된 값을 사용하고 있습니다.

```
authCode:
```

## Contains

이 프로젝트에서 사용된 기술은 다음과 같습니다.

- TypeScript
- React
- react-router
- [recoil](https://github.com/facebookexperimental/Recoil) - 전역 상태 관리 라이브러리
- recoil-persist - recoil로 관리되는 state를 persist 하게 만들어주는 라이브러리 (default로 localStorage에 저장)
- styled-components
- [styled-system](https://styled-system.com/) - ui 컴포넌트 개발을 쉽고 빠르게 만들어주는 style props 라이브러리
- styles-reset
- axios
- [vest](https://github.com/ealush/vest) - form의 유효성 검사를 위한 라이브러리
- cypress - e2e 테스트에 사용한 라이브러리
- ESLint & Prettier

## Getting Started

로컬 환경에서 프로젝트를 실행하는 방법을 간단히 설명하겠습니다.

먼저 git clone을 이용해서 프로젝트를 다운로드합니다.

```
git clone https://github.com/octave08/assignment.git
```

다운로드한 프로젝트 폴더로 이동해서 의존성있는 라이브러리를 설치합니다.

```
cd assignment
yarn // or npm install
```

`start` 명령어를 입력하여 프로젝트 실행합니다.

```
yarn start // or npm run start
```

## Demo

Vercel을 이용해서 `master` 브런치를 기준으로 배포해 놓았지만 proxy 설정의 문제로 정상 동작하지는 않습니다.

- https://assignment-eta.vercel.app

## Explanation

### Folder Directory

```
cypress/
src/
    assets/ - 이미지, 스타일, 폰트 등의 리소스
    components/ - 재사용하기 위한 컴포넌트
    entities/ - 자주 사용되는 Data Model (e.g. User)
    hooks/ - Custom Hook 컴포넌트
    pages/ - containers와 고민하다가 pages로 결정, 페이지 단위의 컴포넌트
    states/ - 전역으로 사용되는 state
    utils/ - form validation과 같은 유틸성 코드
    App.tsx
    index.tsx
```

### Form Validation with Vest

Form 유효성 검사 코드의 중복을 해결하고자 Vest 라이브러리를 적용했습니다.
먼저 유효성 검사를 위한 suite를 작성합니다.

```javascript
import { create, only, test, enforce } from "vest";

const suite = create("Form", (formData, fieldName) => {
  only(fieldName);

  test("email", "이메일을 입력해주세요", () => {
    enforce(formData.email).isNotEmpty();
  });

  test("password", "비밀번호를 입력해주세요", () => {
    enforce(formData.password).isNotEmpty();
  });
});

export default suite;
```

이때, `only`를 이용해서 입력받은 필드에 대해서만 검사할 수 있도록 해야 합니다. 그리고 작성한 suite를 코드에 적용하면 다음과 같습니다.

```javascript
const res = suite(form, _.keys(form));

const submit = () => {
  // ...
  if (res.hasErrors()) {
    alert(_.chain(res.getErrors()).flatMap().head().value());
    return;
  }
  // ...
};
```

suite의 첫번째 파라미터에는 검사하고자 하는 form data를 전달하고 두번째 파라미터로 검사하고자 하는 필드의 key값을 전달하면 됩니다.

#### Use `hasErrors()` instead of `isValid`

위의 로직에서 한가지 주의사항이 있습니다. 두 번째 파라미터로 전달하는 Key 값에 따라서 유효성을 검사하므로 검출된 errors가 0일 수 있지만 `isValid`의 조건은 suite에 속해있는 모든 테스트의 통과가 기준이기 때문에 일부 실행되지 않은 테스트 때문에 `isValid`값이 `false`가 됩니다. 이 때문에 위와 같이 사용할 때 `isValid` 보다는 `hasErrors`를 이용해서 에러가 검출된 지의 여부로 유효성을 확인해야 합니다.

### E2E Testing

요구사항에 제시된 내용을 바탕으로 Cypress를 이용해서 작성했습니다. 이 과정에서 실제로 실수했던 코드도 발견하고 간단한 리펙토링도 할 수 있었습니다. 개발하는 시간과 비슷하게 시간이 많이 소요되었습니다.

총 5개 페이지에 대해서 27개 테스트 작성

```
yarn cypress // or npm run cypress
```

특이사항은 일부 테스트를 위해 비밀번호를 초기화하는 과정이 `before`에 추가되어 있습니다.

## What's more

적용을 고민했던 라이브러리입니다.

- [react-query](https://github.com/tannerlinsley/react-query) - swr 처럼 http request에 대한 캐싱과 업데이트를 도와주ㅁ
- [jest](https://github.com/facebook/jest) - 자바스크립트 테스팅 라이브러리
