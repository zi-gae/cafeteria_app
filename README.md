## redux-persist
  - asyncStorage
  - blacklist
  - PersisGate 
    - AppLoading 처럼 디스크에서 리덕스 스토어를 불러오기전ㅇ까지는 앱을 보여주지 않음

## Rreact native 
  - 컴포넌트에 name 값을 못준다.
  - TextInput 에서 next 로 넘어갈때 ref 이용
  - AsyncStorage 리액트 네티이브 저장소
    - clear() 저장소를 비운다


## react-navigation
- navigation.navigate 로 이동시 props 전달 법
```javascript
navigation.navigate("myScreen", {
  ...props
})
```

## optimistic update
- 다음 동작의 결과를 예상하고 미리 액션을 취해 결과 바로 제공
- 동작은 빠르나 리스크가 있음.
