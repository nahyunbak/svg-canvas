# 프로젝트 소개
✅ svg 벡터 기반의 그림판을 리셋, 저장, undo 및 redo 기능과 함께 구현했다.

# 스크린샷 


https://user-images.githubusercontent.com/61341571/143773600-b8ac2d28-853a-484b-9938-e9cc8ffbdd15.mp4



# 기능 소개 
✅ 선택하기 : 종류, 색깔, 선 굵기, 채우기 색깔을 고를 수 있다.
<br/>
✅ undo(<-) : undo 기능이다. 현재 도형의 좌표를 하나씩 지우고, stack이 비면 도형의 history를 하나씩 지워나간다.  
✅ redo(->) : redo 기능이다. undo에서 지운 좌표를 하나씩 받아들이며,stack이 비면 redo의 history stack에서 값을 가져와 도형의 history stack에 추가한다. 
<br/>
✅ 이번 그림 마무리하기 : 각 도형을 마무리짓는 버튼이다. 
<br/>
✅ 리셋하기 : 캔버스를 리셋시킨다. 
<br/>
✅ 저장하기 : 캔버스를 저장한다.






# 배포 
✅ vercel을 사용하여 배포했다 :  https://svg-canvas.vercel.app/



