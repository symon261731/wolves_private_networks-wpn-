import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './MapYandex.scss';

export default function Map() {
  const [myMap, setMyMap] = useState(null);
  const navigate = useNavigate();
  const servers = useSelector((state) => state.servers);
  // console.log(servers);
  const country = { shir: 55.751574, dolg: 37.573856 };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    ymaps.ready(() => {
      // eslint-disable-next-line no-undef
      const map = new ymaps.Map('map', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
        center: [country.shir, country.dolg],
        zoom: 3,
      }, {
        searchControlProvider: 'yandex#search',

        restrictMapArea: [[85.23618, -178.9], [-73.87011, 181]],
      });

      setMyMap(map);
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    ymaps.ready(() => {
      myMap.geoObjects.removeAll();
      // eslint-disable-next-line no-undef
      const MyIconContentLayout = ymaps.templateLayoutFactory.createClass( // Создаём макет содержимого.
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>',
      );

      servers.forEach((el) => {
        // eslint-disable-next-line no-undef
        const myGeocoder = ymaps.geocode(el.location);
        myGeocoder.then(
          (res) => {
            const coordinates = res.geoObjects.get(0).geometry.getCoordinates();
            // eslint-disable-next-line no-undef
            const myPlacemarkWithContent = new ymaps.Placemark(coordinates, {
              hintContent: [el.location, `${el.rating}🐺`],
              balloonContent: el.price,
              iconContent: '',
            }, {
              iconLayout: 'default#imageWithContent', // Необходимо указать данный тип макета.
              iconImageHref: 'https://cdn-icons-png.flaticon.com/512/22/22723.png', // Своё изображение иконки метки.
              iconImageSize: [48, 48], // Размеры метки.
              iconImageOffset: [-24, -24], // Смещение левого верхнего угла иконки относительно, её "ножки" (точки привязки).
              iconContentOffset: [15, 15], // Смещение слоя с содержимым относительно слоя с картинкой.
              iconContentLayout: MyIconContentLayout, // Макет содержимого.
            });
            myMap?.geoObjects
              .add(myPlacemarkWithContent);

            myPlacemarkWithContent.events.add(['click'], () => {
              navigate(`/server/${el.id}`);
            });
          },
        );
      });
    });
  }, [myMap, country]);

  return (

    <div className="img-fluid" id="map" style={{ width: '800px', height: '1200px', backgroundColor: '#cbdfbd' }} />

  );
}
