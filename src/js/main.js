document.addEventListener("DOMContentLoaded", () => {
	const aside = document.querySelector("#aside")
			, links = aside.querySelectorAll('.item-list > li > a[data-import]')
			, contents = document.querySelector("#contents");

	links.forEach(link => {
		/* 링크 클릭 시, 해당 html 파일 불러오는 로직 */
		link.addEventListener("click", (e) => {
      e.preventDefault();
      // 모든 링크에서 on 클래스 제거
      links.forEach(l => l.classList.remove('on'));
      e.currentTarget.classList.add('on');

			const fileName = e.currentTarget.dataset.import || '';
			if (!fileName) {
				return
			};

			fetch(fileName)
				.then(response => {
					if (!response.ok) throw new Error('파일을 불러올 수 없습니다.');
					return response.text();
				})
				.then(html => {
					contents.innerHTML = html;
				})
				.catch(err => {
					contents.innerHTML = '<p>파일을 불러올 수 없습니다.</p>';
				});
		});
	});
});