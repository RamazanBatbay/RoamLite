import { DayItinerary, Place } from './types';

interface CityData {
  center: { latitude: number; longitude: number };
  landmarks: Place[];
}

export const CITIES_DATA: Record<string, CityData> = {
  Warsaw: {
    center: { latitude: 52.2297, longitude: 21.0122 },
    landmarks: [
      {
        id: 'w1',
        name: 'Palace of Culture and Science',
        description: 'Iconic high-rise offering panoramic city views.',
        coordinate: { latitude: 52.2318, longitude: 21.006 },
        imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/be/ba/3f/caption.jpg',
      },
      {
        id: 'w2',
        name: 'Old Town Market Square',
        description: 'Historic square surrounded by colorful tenement houses.',
        coordinate: { latitude: 52.2497, longitude: 21.0122 },
        imageUrl: 'https://www.civitatis.com/f/polonia/varsovia/guia/plaza-mercado-m.jpg',
      },
      {
        id: 'w3',
        name: 'Royal Castle',
        description: 'Reconstructed 14th-century palace.',
        coordinate: { latitude: 52.248, longitude: 21.0144 },
        imageUrl: 'https://kidsinthecity.pl/wp-content/uploads/2019/09/Plac-Zamkowy-Castle-Square.jpg',
      },
      {
        id: 'w4',
        name: 'Lazienki Park',
        description: 'Largest park in Warsaw with a palace on the water.',
        coordinate: { latitude: 52.215, longitude: 21.0353 },
        imageUrl: 'https://www.ilovepoland.net/wp-content/uploads/2020/10/lazienki-park-warsaw-poland-header.jpg',
      },
      {
        id: 'w5',
        name: 'Warsaw Uprising Museum',
        description: 'Museum dedicated to the 1944 uprising.',
        coordinate: { latitude: 52.2323, longitude: 20.9806 },
        imageUrl: 'https://www.go2warsaw.pl/wp-content/uploads/muzeum-powstania-warszawskiego-fot-filip-kwiatkowski-2.jpg',
      },
      {
        id: 'w6',
        name: 'Copernicus Science Centre',
        description: 'Interactive science museum on the bank of the Vistula River.',
        coordinate: { latitude: 52.2418, longitude: 21.0286 },
        imageUrl: 'https://www.urtrips.net/wp-content/uploads/2022/12/Copernicus-Science-Museum-Warsaw.jpg',
      },
      {
        id: 'w7',
        name: 'POLIN Museum',
        description: 'Museum of the History of Polish Jews on the site of the former Warsaw Ghetto.',
        coordinate: { latitude: 52.2495, longitude: 20.9934 },
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/61434ca10d58db473abc5039/1635962837080-1K2RKLCPTM0T7JM0QE0V/polin+museum+in+fall.jpg',
      },
      {
        id: 'w8',
        name: 'Wilanów Palace',
        description: 'A royal palace that survived Poland\'s partitions and both World Wars.',
        coordinate: { latitude: 52.1651, longitude: 21.0880 },
        imageUrl: 'https://its-poland.com/files/services_photos/99cac9877d9d5b85ccad615cf7ba1a37.jpg',
      },
      {
        id: 'w9',
        name: 'National Stadium',
        description: 'Retractable roof football stadium used for major events and concerts.',
        coordinate: { latitude: 52.2390, longitude: 21.0456 },
        imageUrl: 'https://www.mojekonferencje.pl/media/objects/object2616/pge-narodowy-konferencje-warszawa.jpg',
      },
      {
        id: 'w10',
        name: 'Chopin Monument',
        description: 'Large bronze statue of Frédéric Chopin in the upper part of Łazienki Park.',
        coordinate: { latitude: 52.2139, longitude: 21.0286 },
        imageUrl: 'https://warsawinsider.pl/wp-content/uploads/2023/03/shutterstock_1193948323-scaled-1.jpg',
      },
    ],
  },
  Paris: {
    center: { latitude: 48.8566, longitude: 2.3522 },
    landmarks: [
      {
        id: 'p1',
        name: 'Eiffel Tower',
        description: 'Wrought-iron lattice tower on the Champ de Mars.',
        coordinate: { latitude: 48.8584, longitude: 2.2945 },
        imageUrl: 'https://media.cntraveler.com/photos/58de89946c3567139f9b6cca/1:1/w_3633,h_3633,c_limit/GettyImages-468366251.jpg',
      },
      {
        id: 'p2',
        name: 'Louvre Museum',
        description: 'World\'s largest art museum and historic monument.',
        coordinate: { latitude: 48.8606, longitude: 2.3376 },
        imageUrl: 'https://media.cntraveler.com/photos/57d961ce3e6b32bf25f5ad0f/16:9/w_2560,c_limit/most-beautiful-paris-louvre-GettyImages-536267205.jpg',
      },
      {
        id: 'p3',
        name: 'Notre-Dame Cathedral',
        description: 'Medieval Catholic cathedral.',
        coordinate: { latitude: 48.8529, longitude: 2.3499 },
        imageUrl: 'https://www.paristoversailles.com/wp-content/uploads/WhatsApp-Image-2025-01-09-at-15.18.41.jpeg',
      },
      {
        id: 'p4',
        name: 'Arc de Triomphe',
        description: 'Monument honoring those who fought for France.',
        coordinate: { latitude: 48.8738, longitude: 2.295 },
        imageUrl: 'https://lp-cms-production.imgix.net/2019-06/GettyImages-544837009_full.jpg',
      },
      {
        id: 'p5',
        name: 'Sacré-Cœur',
        description: 'Basilica located at the summit of the butte Montmartre.',
        coordinate: { latitude: 48.8867, longitude: 2.3431 },
        imageUrl: 'https://www.parisperfect.com/g/photos/upload/sml_762877544-1484631931-Sacre-HERO.jpg',
      },
      {
        id: 'p6',
        name: 'Musée d\'Orsay',
        description: 'Art museum housed in a grand former railway station.',
        coordinate: { latitude: 48.8600, longitude: 2.3226 },
        imageUrl: 'https://mozartcultures.com/en/wp-content/uploads/2021/04/musee-dorsay-scaled.jpg',
      },
      {
        id: 'p7',
        name: 'Panthéon',
        description: 'A monument in the Latin Quarter containing the remains of distinguished French citizens.',
        coordinate: { latitude: 48.8462, longitude: 2.3449 },
        imageUrl: 'https://cdn-imgix.headout.com/media/images/bd3aea01b223dffac955b5787fddbfab-1717-paris-8-paris-%7C-paris-101_attractions_pantheon-01.jpg',
      },
      {
        id: 'p8',
        name: 'Sainte-Chapelle',
        description: 'Royal chapel in the Gothic style, featuring stunning stained glass windows.',
        coordinate: { latitude: 48.8554, longitude: 2.3450 },
        imageUrl: 'https://www.pariscityvision.com/library/image/4020.jpg',
      },
      {
        id: 'p9',
        name: 'Palais Garnier',
        description: 'An iconic 1,979-seat opera house built for the Paris Opera.',
        coordinate: { latitude: 48.8719, longitude: 2.3316 },
        imageUrl: 'https://cdn.sanity.io/images/nxpteyfv/goguides/5ab4c7be835b256889e851a336d54931fd43f6b2-1600x1066.jpg',
      },
      {
        id: 'p10',
        name: 'Place du Tertre',
        description: 'Famous square in Montmartre known for its painters and portraitists.',
        coordinate: { latitude: 48.8863, longitude: 2.3406 },
        imageUrl: 'https://as2.ftcdn.net/jpg/02/26/12/39/1000_F_226123932_ezNSJfsZktZX3r4eGiuOAUh0MdCcWMK1.jpg',
      },
    ],
  },
  Rome: {
    center: { latitude: 41.9028, longitude: 12.4964 },
    landmarks: [
      {
        id: 'r1',
        name: 'Colosseum',
        description: 'Iconic ancient amphitheater in the center of Rome.',
        coordinate: { latitude: 41.8902, longitude: 12.4922 },
        imageUrl: 'https://www.exoticca.com/wp-content/uploads/2025/05/colosseum-rome.jpeg',
      },
      {
        id: 'r2',
        name: 'Trevi Fountain',
        description: '18th-century sculpted fountain.',
        coordinate: { latitude: 41.9009, longitude: 12.4833 },
        imageUrl: 'https://www.thetrainline.com/cms/media/10952/italy-rome-trevi-fountain.jpg',
      },
      {
        id: 'r3',
        name: 'Pantheon',
        description: 'Former Roman temple, now a Catholic church.',
        coordinate: { latitude: 41.8986, longitude: 12.4769 },
        imageUrl: 'https://www.pelago.com/img/products/IT-Italy/1-hour-pantheon-tour-a-time-travel-experience-in-rome/66d79118-ec45-4a3b-93b0-007a86a0e031_1-hour-pantheon-tour-a-time-travel-experience-in-rome.jpg',
      },
      {
        id: 'r4',
        name: 'Roman Forum',
        description: 'Rectangular forum surrounded by the ruins of important ancient government buildings.',
        coordinate: { latitude: 41.8925, longitude: 12.4853 },
        imageUrl: 'https://www.exp1.com/wp-content/uploads/sites/7/2025/06/Roman-Forum-scaled.jpg',
      },
      {
        id: 'r5',
        name: 'Vatican Museums',
        description: 'Public art and sculpture museums in the Vatican City.',
        coordinate: { latitude: 41.9065, longitude: 12.4536 },
        imageUrl: 'https://cdn.projectexpedition.com/photos/646b8793f1936_sized.jpg',
      },
      {
        id: 'r6',
        name: 'St. Peter\'s Basilica',
        description: 'The largest church in the world, located in Vatican City.',
        coordinate: { latitude: 41.9022, longitude: 12.4539 },
        imageUrl: 'https://www.thetrainline.com/cms/media/4259/italy-rome-st-peters-basilica.jpg',
      },
      {
        id: 'r7',
        name: 'Piazza Navona',
        description: 'Elegant square featuring the Fountain of the Four Rivers.',
        coordinate: { latitude: 41.8992, longitude: 12.4731 },
        imageUrl: 'https://www.edgeofwonder.travel/wp-content/uploads/sites/55112/2025/04/Italy-Rome-Christmas_185293811-scaled.jpeg',
      },
      {
        id: 'r8',
        name: 'Spanish Steps',
        description: 'A monumental stairway of 135 steps climbing a steep slope.',
        coordinate: { latitude: 41.9059, longitude: 12.4823 },
        imageUrl: 'https://colosseumrometickets.com/wp-content/uploads/2018/10/Spanish-Steps-in-the-morning-with-azaleas-in-Rome-Italy.-Rome-Spanish-Steps-Scalinata-della-Trinità-dei-Monti-are-a-famous-landmark-and-attraction-of-Rome-and-Italy..jpg',
      },
      {
        id: 'r9',
        name: 'Castel Sant\'Angelo',
        description: 'A towering cylindrical building originally commissioned by Emperor Hadrian as a mausoleum.',
        coordinate: { latitude: 41.9031, longitude: 12.4663 },
        imageUrl: 'https://www.civitavecchia.portmobility.it/sites/default/files/castel_sant_angelo_-_roma.jpg',
      },
      {
        id: 'r10',
        name: 'Villa Borghese Gardens',
        description: 'A large landscape garden containing several buildings, museums, and attractions.',
        coordinate: { latitude: 41.9136, longitude: 12.4886 },
        imageUrl: 'https://cdn.citywonders.com/media/17193/villa-borghese-gardens.jpg',
      },
    ],
  },
};

export const AVAILABLE_CITIES = Object.keys(CITIES_DATA);

const GENERIC_LANDMARKS: Place[] = [
  {
    id: 'g1',
    name: 'City Center',
    description: 'Main square of the city.',
    coordinate: { latitude: 0, longitude: 0 },
    imageUrl: 'https://picsum.photos/id/10/200/200',
  },
  {
    id: 'g2',
    name: 'Local Museum',
    description: 'Historical museum.',
    coordinate: { latitude: 0.01, longitude: 0.01 },
    imageUrl: 'https://picsum.photos/id/11/200/200',
  },
  {
    id: 'g3',
    name: 'Main Park',
    description: 'A beautiful place to relax.',
    coordinate: { latitude: -0.01, longitude: -0.01 },
    imageUrl: 'https://picsum.photos/id/12/200/200',
  },
  {
    id: 'g4',
    name: 'Famous Monument',
    description: 'Iconic landmark.',
    coordinate: { latitude: 0.02, longitude: 0 },
    imageUrl: 'https://picsum.photos/id/13/200/200',
  },
  {
    id: 'g5',
    name: 'Shopping District',
    description: 'Area with various shops and cafes.',
    coordinate: { latitude: 0, longitude: 0.02 },
    imageUrl: 'https://picsum.photos/id/14/200/200',
  },
];

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
};

const formatDateDDMMYYYY = (date: Date) => {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

export const generateTripItinerary = async (
  destination: string,
  startDate: string,
  duration: number
): Promise<DayItinerary[]> => {
  return new Promise((resolve, reject) => {
    if (!destination.trim()) {
      reject(new Error('Destination cannot be empty.'));
      return;
    }
    if (duration < 1) {
      reject(new Error('Trip duration must be at least 1 day.'));
      return;
    }

    setTimeout(() => {
      const cityData = CITIES_DATA[
        Object.keys(CITIES_DATA).find((k) => k.toLowerCase() === destination.toLowerCase()) || ''
      ];

      const landmarks = cityData ? cityData.landmarks : GENERIC_LANDMARKS;
      const start = new Date(startDate);
      const itinerary: DayItinerary[] = [];

      // Smart Routing
      const orderedLandmarks: Place[] = [];
      if (landmarks.length > 0) {
        let remaining = [...landmarks];
        let current = remaining.shift() as Place;
        orderedLandmarks.push(current);

        while (remaining.length > 0) {
          remaining.sort((a, b) =>
            calculateDistance(current.coordinate.latitude, current.coordinate.longitude, a.coordinate.latitude, a.coordinate.longitude) -
            calculateDistance(current.coordinate.latitude, current.coordinate.longitude, b.coordinate.latitude, b.coordinate.longitude)
          );
          current = remaining.shift() as Place;
          orderedLandmarks.push(current);
        }
      }

      const maxActionDays = Math.min(duration, orderedLandmarks.length);

      for (let i = 0; i < maxActionDays; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);

        itinerary.push({
          day: i + 1,
          date: formatDateDDMMYYYY(currentDate),
          places: [orderedLandmarks[i]],
        });
      }

      if (duration > orderedLandmarks.length) {
        const freeDayStart = new Date(start);
        freeDayStart.setDate(start.getDate() + orderedLandmarks.length);

        const freeDayEnd = new Date(start);
        freeDayEnd.setDate(start.getDate() + duration - 1);

        const combinedDateStr = `${formatDateDDMMYYYY(freeDayStart)} to ${formatDateDDMMYYYY(freeDayEnd)}`;

        itinerary.push({
          day: orderedLandmarks.length + 1,
          date: combinedDateStr,
          places: [{
            id: 'free-days',
            name: `Days ${orderedLandmarks.length + 1} - ${duration}: Free Time`,
            description: "You've seen the main sights! Use the rest of your trip to try local restaurants, visit a cafe, or just wander the streets and relax.",
            coordinate: { latitude: 0, longitude: 0 },
            imageUrl: 'https://images.unsplash.com/photo-1484723091792-c195600f30fb?auto=format&fit=crop&w=400&q=80',
            isFreeDay: true,
          }],
        });
      }

      resolve(itinerary);
    }, 1500);
  });
};
