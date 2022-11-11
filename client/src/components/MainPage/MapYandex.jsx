import React from 'react';

export default function Map() {
  return (
    <>
      {' '}
      <div>Map</div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <a
          href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps"
          style={{
            color: '#eee', fontSize: '12px', position: 'absolute', top: '0px',
          }}
        >
          Москва
        </a>
        <a
          href="https://yandex.ru/maps/213/moscow/?ll=37.617700%2C55.755863&utm_medium=mapframe&utm_source=maps&z=10"
          style={{
            color: '#eee', fontSize: '12px', position: 'absolute', top: '14px',
          }}
        >
          Яндекс Карты — транспорт, навигация, поиск мест
        </a>
        <iframe title="aaa" src="https://yandex.ru/map-widget/v1/-/CCUZr6dmsA" width="560" height="800" frameBorder="1" allowfullscreen="true" style={{ position: 'relative' }} />
      </div>
    </>

  );
}
