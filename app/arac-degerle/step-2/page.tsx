'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Car, CheckCircle } from 'lucide-react';

// Kapsamlı model verileri
const carModels = {
  'Acura': ['cl', 'ilx', 'integra', 'legend', 'mdx', 'nsx', 'rdx', 'rl', 'rsx', 'tl', 'tlx', 'tsx', 'zdx'],
  'Alfa Romeo': ['147', '155', '156', '159', '164', '166', '4c', 'brera', 'giulia', 'giulietta', 'gt', 'gtv', 'mito', 'spider', 'stelvio', 'tonale'],
  'Aston Martin': ['db11', 'db12', 'db7', 'db9', 'dbs', 'rapide', 'v8 vantage', 'v12 vantage', 'vanquish', 'virage', 'dbx'],
  'Audi': ['a1', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'q2', 'q3', 'q4', 'q5', 'q7', 'q8', 'rs3', 'rs4', 'rs5', 'rs6', 'rs7', 's3', 's4', 's5', 's6', 's7', 's8', 'tt', 'tts', 'tt rs', 'r8', 'e-tron', 'e-tron gt', 'q8 e-tron'],
  'Bentley': ['arnage', 'azure', 'bentayga', 'brooklands', 'continental gt', 'flying spur', 'mulsanne'],
  'BMW': ['1 serisi', '2 serisi', '3 serisi', '4 serisi', '5 serisi', '6 serisi', '7 serisi', '8 serisi', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'z4', 'i3', 'i4', 'i7', 'ix', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm8', 'x3 m', 'x4 m', 'x5 m', 'x6 m'],
  'Buick': ['century', 'enclave', 'encore', 'envision', 'lacrosse', 'lesabre', 'lucerne', 'park avenue', 'regal', 'rendezvous', 'riviera', 'skylark', 'terraza'],
  'Cadillac': ['ats', 'bls', 'ct4', 'ct5', 'ct6', 'cts', 'dts', 'eldorado', 'escalade', 'srx', 'sts', 'xlr', 'xt4', 'xt5', 'xt6', 'xts'],
  'Chevrolet': ['aveo', 'camaro', 'caprice', 'captiva', 'cavalier', 'cobalt', 'corvette', 'cruze', 'epica', 'equinox', 'hhr', 'impala', 'lacetti', 'lumina', 'malibu', 'matiz', 'monte carlo', 'orlando', 'sonic', 'spark', 'suburban', 'tahoe', 'trailblazer', 'traverse', 'trax', 'volt'],
  'Chrysler': ['200', '300', '300c', '300m', 'cirrus', 'concorde', 'crossfire', 'grand voyager', 'intrepid', 'lhs', 'neon', 'pacifica', 'pt cruiser', 'sebring', 'stratus', 'town & country', 'voyager'],
  'Citroën': ['berlingo', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c8', 'c-elysee', 'c3 aircross', 'c4 cactus', 'c4 picasso', 'c5 aircross', 'ds3', 'ds4', 'ds5', 'jumpy', 'nemo', 'saxo', 'xantia', 'xsara', 'xzara picasso'],
  'Dodge': ['avenger', 'caliber', 'caravan', 'challenger', 'charger', 'dart', 'durango', 'grand caravan', 'journey', 'magnum', 'neon', 'nitro', 'ram', 'stratus', 'viper'],
  'Ferrari': ['296', '360', '430', '458', '488', '512', '550', '575', '599', '612', 'california', 'dino', 'enzo', 'f12', 'f355', 'f40', 'f430', 'f50', 'f8', 'ff', 'fxx', 'laferrari', 'mondial', 'portofino', 'roma', 'sf90', 'testarossa'],
  'Fiat': ['500', '500l', '500x', 'bravo', 'croma', 'doblo', 'fiorino', 'grande punto', 'idea', 'linea', 'marea', 'multipla', 'palio', 'panda', 'punto', 'qubo', 'scudo', 'sedici', 'stilo', 'tipo', 'uno'],
  'Ford': ['b-max', 'c-max', 'capri', 'cortina', 'cougar', 'ecosport', 'edge', 'escort', 'explorer', 'fiesta', 'focus', 'fusion', 'galaxy', 'ka', 'kuga', 'mondeo', 'mustang', 'orion', 'puma', 'ranger', 's-max', 'scorpio', 'sierra', 'streetka', 'taurus', 'transit', 'windstar'],
  'Genesis': ['g70', 'g80', 'g90', 'gv60', 'gv70', 'gv80'],
  'GMC': ['acadia', 'canyon', 'envoy', 'jimmy', 'safari', 'savana', 'sierra', 'sonoma', 'terrain', 'yukon'],
  'Honda': ['accord', 'civic', 'cr-v', 'cr-z', 'element', 'fit', 'hr-v', 'insight', 'jazz', 'legend', 'nsx', 'odyssey', 'pilot', 'prelude', 'ridgeline', 's2000', 'stream', 'e:ny1'],
  'Hyundai': ['accent', 'atos', 'azera', 'coupe', 'elantra', 'entourage', 'equus', 'excel', 'genesis', 'getz', 'grandeur', 'i10', 'i20', 'i30', 'i40', 'ioniq', 'ix35', 'kona', 'lantra', 'matrix', 'pony', 'santa fe', 'scoupe', 'sonata', 'stellar', 'tiburon', 'trajet', 'tucson', 'veloster', 'venue', 'verna', 'xg'],
  'Infiniti': ['ex', 'fx', 'g', 'i', 'j', 'm', 'q30', 'q40', 'q50', 'q60', 'q70', 'qx30', 'qx50', 'qx60', 'qx70', 'qx80'],
  'Jaguar': ['e-pace', 'f-pace', 'f-type', 'i-pace', 's-type', 'x-type', 'xe', 'xf', 'xj', 'xk'],
  'Jeep': ['cherokee', 'compass', 'gladiator', 'grand cherokee', 'liberty', 'patriot', 'renegade', 'wrangler'],
  'Kia': ['carens', 'ceed', 'cerato', 'clarus', 'ev6', 'forte', 'k5', 'k900', 'magentis', 'morning', 'niro', 'optima', 'picanto', 'pride', 'rio', 'sedona', 'sephia', 'sorento', 'soul', 'sportage', 'stinger', 'stonic', 'telluride'],
  'Lamborghini': ['aventador', 'countach', 'diablo', 'gallardo', 'huracan', 'murcielago', 'reventon', 'urus', 'veneno'],
  'Land Rover': ['defender', 'discovery', 'freelander', 'range rover', 'range rover evoque', 'range rover sport', 'range rover velar'],
  'Lexus': ['ct', 'es', 'gs', 'hs', 'is', 'lc', 'lf-a', 'ls', 'lx', 'nx', 'rc', 'rx', 'sc', 'ux'],
  'Lincoln': ['aviator', 'continental', 'corsair', 'ls', 'mark lt', 'mark viii', 'mkc', 'mks', 'mkt', 'mkx', 'mkz', 'navigator', 'town car', 'zephyr'],
  'Lotus': ['elise', 'elan', 'esprit', 'europa', 'evora', 'exige'],
  'Maserati': ['3200 gt', '4200 gt', 'biturbo', 'coupe', 'ghibli', 'granturismo', 'levante', 'mc20', 'quattroporte', 'spyder'],
  'Mazda': ['2', '3', '5', '6', '323', '626', '929', 'atenza', 'axela', 'b-series', 'cx-3', 'cx-30', 'cx-5', 'cx-7', 'cx-9', 'demio', 'familia', 'mx-3', 'mx-5', 'mx-6', 'premacy', 'protege', 'rx-7', 'rx-8', 'tribute'],
  'McLaren': ['540c', '570s', '600lt', '650s', '675lt', '720s', '750s', '765lt', 'artura', 'f1', 'gt', 'mp4-12c', 'p1', 'senna'],
  'Mercedes-Benz': ['a serisi', 'b serisi', 'c serisi', 'cl serisi', 'cla', 'clk', 'cls', 'e serisi', 'g serisi', 'gl serisi', 'gla', 'glb', 'glc', 'gle', 'glk', 'gls', 'm serisi', 'r serisi', 's serisi', 'sl serisi', 'slc', 'slk', 'sls', 'v serisi', 'amg gt', 'eqa', 'eqb', 'eqc', 'eqe', 'eqs'],
  'MINI': ['clubman', 'convertible', 'countryman', 'coupe', 'hardtop', 'paceman', 'roadster'],
  'Mitsubishi': ['3000gt', 'asx', 'carisma', 'colt', 'diamante', 'eclipse', 'eclipse cross', 'endeavor', 'fto', 'galant', 'grandis', 'i-miev', 'l200', 'l300', 'lancer', 'mirage', 'montero', 'outlander', 'pajero', 'space star', 'space wagon'],
  'Nissan': ['100nx', '200sx', '240sx', '300zx', '350z', '370z', 'almera', 'altima', 'armada', 'ariya', 'bluebird', 'cube', 'frontier', 'gt-r', 'juke', 'leaf', 'maxima', 'micra', 'murano', 'navara', 'note', 'nv200', 'pathfinder', 'patrol', 'pixo', 'primera', 'pulsar', 'qashqai', 'quest', 'rogue', 'sentra', 'silvia', 'skyline', 'sunny', 'teana', 'terrano', 'tiida', 'titan', 'versa', 'x-trail'],
  'Oldsmobile': ['achieva', 'alero', 'aurora', 'bravada', 'cutlass', 'intrigue', 'silhouette'],
  'Peugeot': ['1007', '106', '107', '108', '2008', '205', '206', '207', '208', '3008', '301', '306', '307', '308', '4007', '4008', '405', '406', '407', '5008', '508', '607', '806', '807', 'partner', 'rcz'],
  'Pontiac': ['aztek', 'bonneville', 'firebird', 'g3', 'g5', 'g6', 'g8', 'grand am', 'grand prix', 'gto', 'montana', 'solstice', 'sunfire', 'torrent', 'vibe'],
  'Porsche': ['356', '911', '912', '914', '924', '928', '944', '959', '968', 'boxster', 'carrera gt', 'cayenne', 'cayman', 'macan', 'panamera', 'taycan'],
  'Ram': ['1500', '2500', '3500', 'dakota', 'promaster'],
  'Renault': ['4', '5', '6', '9', '11', '12', '14', '16', '18', '19', '20', '21', '25', '30', 'clio', 'espace', 'express', 'fluence', 'fuego', 'grand scenic', 'kadjar', 'kangoo', 'koleos', 'laguna', 'megane', 'modus', 'r4', 'r5', 'r6', 'r9', 'r11', 'r12', 'r14', 'r16', 'r18', 'r19', 'r20', 'r21', 'r25', 'r30', 'safrane', 'scenic', 'symbol', 'talisman', 'twingo', 'vel satis', 'wind', 'zoe'],
  'Rolls-Royce': ['camargue', 'corniche', 'cullinan', 'dawn', 'ghost', 'phantom', 'silver cloud', 'silver dawn', 'silver seraph', 'silver shadow', 'silver spirit', 'silver spur', 'silver wraith', 'wraith'],
  'Saab': ['9-2x', '9-3', '9-4x', '9-5', '9-7x', '90', '900', '9000', '93', '95', '96', '99'],
  'Saturn': ['astra', 'aura', 'ion', 'l-series', 'outlook', 'relay', 'sky', 's-series', 'vue'],
  'Scion': ['fr-s', 'ia', 'im', 'iq', 'tc', 'xa', 'xb', 'xd'],
  'Seat': ['alhambra', 'altea', 'arona', 'ateca', 'cordoba', 'exeo', 'ibiza', 'leon', 'marbella', 'mii', 'tarraco', 'toledo'],
  'Škoda': ['citigo', 'fabia', 'favorit', 'felicia', 'kamiq', 'karoq', 'kodiaq', 'octavia', 'rapid', 'roomster', 'scala', 'superb', 'yeti'],
  'Smart': ['fortwo', 'forfour', 'roadster'],
  'Subaru': ['brz', 'forester', 'impreza', 'justy', 'legacy', 'leone', 'levorg', 'outback', 'svx', 'tribeca', 'vivio', 'wrx', 'xv'],
  'Suzuki': ['alto', 'baleno', 'cappuccino', 'carry', 'celerio', 'cultus', 'equator', 'esteem', 'forenza', 'grand vitara', 'ignis', 'jimny', 'kizashi', 'liana', 'maruti', 'reno', 'samurai', 'sidekick', 'splash', 'swift', 'sx4', 'verona', 'vitara', 'wagon r', 'x-90'],
  'Tesla': ['model 3', 'model s', 'model x', 'model y', 'roadster', 'cybertruck'],
  'Toyota': ['4runner', '86', 'auris', 'avalon', 'avensis', 'aygo', 'c-hr', 'camry', 'celica', 'corolla', 'corona', 'cressida', 'crown', 'echo', 'fj cruiser', 'highlander', 'hilux', 'iq', 'land cruiser', 'matrix', 'mr2', 'paseo', 'previa', 'prius', 'rav4', 'sequoia', 'sienna', 'solara', 'supra', 'tacoma', 'tercel', 'tundra', 'venza', 'yaris', 'bz4x'],
  'Volkswagen': ['arteon', 'beetle', 'bora', 'caddy', 'corrado', 'eos', 'fox', 'golf', 'id.3', 'id.4', 'id.5', 'id.buzz', 'jetta', 'lupo', 'new beetle', 'passat', 'phaeton', 'polo', 'rabbit', 'routan', 'scirocco', 'sharan', 't-cross', 't-roc', 'tiguan', 'touareg', 'touran', 'up', 'vento'],
  'Volvo': ['240', '340', '360', '440', '460', '480', '740', '760', '780', '850', '940', '960', 'c30', 'c70', 's40', 's60', 's70', 's80', 's90', 'v40', 'v50', 'v60', 'v70', 'v90', 'xc40', 'xc60', 'xc70', 'xc90']
};

function Step2Content() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || '';
  const [selectedModel, setSelectedModel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const models = carModels[brand as keyof typeof carModels] || [];
  const filteredModels = models.filter(model =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Marka seçilmedi</h1>
          <Link href="/arac-degerle" className="text-blue-600 hover:underline">
            Marka seçimine geri dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">aracteklifi.com</h1>
            </Link>
            <div className="text-sm text-gray-500">
              Adım 2 / 7
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Araç Markası</div>
                  <div className="text-xs text-gray-500">{brand}</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  2
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Yıl</div>
                  <div className="text-xs text-gray-500">Üretim yılı</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  3
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Model</div>
                  <div className="text-xs text-gray-400">Model seçimi</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  4
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Hasar Bilgileri</div>
                  <div className="text-xs text-gray-400">Araç durumu</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  5
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Detaylar</div>
                  <div className="text-xs text-gray-400">Kilometre, yakıt, vites</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  6
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">İletişim</div>
                  <div className="text-xs text-gray-400">Bilgileriniz</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  7
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Sonuç</div>
                  <div className="text-xs text-gray-400">Değerleme raporu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Araç Yılını Seçin
          </h1>
          <p className="text-lg text-gray-600">
            {brand} aracınızın üretim yılını belirtin
          </p>
        </div>

        {/* Year Selection */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => new Date().getFullYear() - i).map((year) => (
              <button
                key={year}
                onClick={() => setSelectedModel(year.toString())}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedModel === year.toString()
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <span className="text-lg font-semibold">{year}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/arac-degerle"
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri
          </Link>
          
          <Link
            href={selectedModel ? `/arac-degerle/step-3?brand=${encodeURIComponent(brand)}&year=${encodeURIComponent(selectedModel)}` : '#'}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
              selectedModel
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Devam Et
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Step2() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Yükleniyor...</h1>
        </div>
      </div>
    }>
      <Step2Content />
    </Suspense>
  );
}
