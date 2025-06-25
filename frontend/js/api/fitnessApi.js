const BASE_URL = 'http://localhost:3000/fitnessLogs';

// 전체 문서 가져오기
export async function fetchDocuments() {
  const res = await fetch(BASE_URL);
  return res.json();
}

// 새 문서 생성
export async function createDocument(document) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(document),
  });
  return res.json();
}

// 문서 삭제
export async function deleteDocument(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}