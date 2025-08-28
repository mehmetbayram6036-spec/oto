'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Car } from 'lucide-react';

// Kapsamlı model verileri
const carModels = {
  'acura': ['cl', 'ilx', 'integra', 'legend', 'mdx', 'nsx', 'rdx', 'rl', 'rsx', 'tl', 'tlx', 'tsx', 'zdx'],
  'alfa romeo': ['147', '155', '156', '159', '164', '166', '4c', 'brera', 'giulia', 'giulietta', 'gt', 'gtv', 'mito', 'spider', 'stelvio', 'tonale'],
  'aston martin': ['db11', 'db12', 'db7', 'db9', 'dbs', 'rapide', 'v8 vantage', 'v12 vantage', 'vanquish', 'virage', 'dbx'],
  'audi': ['a1', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'q2', 'q3', 'q4', 'q5', 'q7', 'q8', 'rs3', 'rs4', 'rs5', 'rs6', 'rs7', 's3', 's4', 's5', 's6', 's7', 's8', 'tt', 'tts', 'tt rs', 'r8', 'e-tron', 'e-tron gt', 'q8 e-tron'],
  'bentley': ['arnage', 'azure', 'bentayga', 'brooklands', 'continental gt', 'flying spur', 'mulsanne'],
  'bmw': ['1 serisi', '2 serisi', '3 serisi', '4 serisi', '5 serisi', '6 serisi', '7 serisi', '8 serisi', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'z4', 'i3', 'i4', 'i7', 'ix', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm8', 'x3 m', 'x4 m', 'x5 m', 'x6 m'],
  'buick': ['century', 'enclave', 'encore', 'envision', 'lacrosse', 'lesabre', 'lucerne', 'park avenue', 'regal', 'rendezvous', 'riviera', 'skylark', 'terraza'],
  'cadillac': ['ats', 'bls', 'ct4', 'ct5', 'ct6', 'cts', 'dts', 'eldorado', 'escalade', 'srx', 'sts', 'xlr', 'xt4', 'xt5', 'xt6', 'xts'],
  'chevrolet': ['aveo', 'camaro', 'caprice', 'captiva', 'cavalier', 'cobalt', 'corvette', 'cruze', 'epica', 'equinox', 'hhr', 'impala', 'lacetti', 'lumina', 'malibu', 'matiz', 'monte carlo', 'orlando', 'sonic', 'spark', 'suburban', 'tahoe', 'trailblazer', 'traverse', 'trax', 'volt'],
  'chrysler': ['200', '300', '300c', '300m', 'cirrus', 'concorde', 'crossfire', 'grand voyager', 'intrepid', 'lhs', 'neon', 'pacifica', 'pt cruiser', 'sebring', 'stratus', 'town & country', 'voyager'],
  'citroën': ['berlingo', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c8', 'c-elysee', 'c3 aircross', 'c4 cactus', 'c4 picasso', 'c5 aircross', 'ds3', 'ds4', 'ds5', 'jumpy', 'nemo', 'saxo', 'xantia', 'xsara', 'xzara picasso'],
  'dodge': ['avenger', 'caliber', 'caravan', 'challenger', 'charger', 'dart', 'durango', 'grand caravan', 'journey', 'magnum', 'neon', 'nitro', 'ram', 'stratus', 'viper'],
  'ferrari': ['296', '360', '430', '458', '488', '512', '550', '575', '599', '612', 'california', 'dino', 'enzo', 'f12', 'f355', 'f40', 'f430', 'f50', 'f8', 'ff', 'fxx', 'laferrari', 'mondial', 'portofino', 'roma', 'sf90', 'testarossa'],
  'fiat': ['500', '500l', '500x', 'bravo', 'croma', 'doblo', 'fiorino', 'grande punto', 'idea', 'linea', 'marea', 'multipla', 'palio', 'panda', 'punto', 'qubo', 'scudo', 'sedici', 'stilo', 'tipo', 'uno'],
  'ford': ['b-max', 'c-max', 'capri', 'cortina', 'cougar', 'ecosport', 'edge', 'escort', 'explorer', 'fiesta', 'focus', 'fusion', 'galaxy', 'ka', 'kuga', 'mondeo', 'mustang', 'orion', 'puma', 'ranger', 's-max', 'scorpio', 'sierra', 'streetka', 'taurus', 'transit', 'windstar'],
  'genesis': ['g70', 'g80', 'g90', 'gv60', 'gv70', 'gv80'],
  'gmc': ['acadia', 'canyon', 'envoy', 'jimmy', 'safari', 'savana', 'sierra', 'sonoma', 'terrain', 'yukon'],
  'honda': ['accord', 'civic', 'cr-v', 'cr-z', 'element', 'fit', 'hr-v', 'insight', 'jazz', 'legend', 'nsx', 'odyssey', 'pilot', 'prelude', 'ridgeline', 's2000', 'stream', 'e:ny1'],
  'hyundai': ['accent', 'atos', 'azera', 'coupe', 'elantra', 'entourage', 'equus', 'excel', 'genesis', 'getz', 'grandeur', 'i10', 'i20', 'i30', 'i40', 'ioniq', 'ix35', 'kona', 'lantra', 'matrix', 'pony', 'santa fe', 'scoupe', 'sonata', 'stellar', 'tiburon', 'trajet', 'tucson', 'veloster', 'venue', 'verna', 'xg'],
  'infiniti': ['ex', 'fx', 'g', 'i', 'j', 'm', 'q30', 'q40', 'q50', 'q60', 'q70', 'qx30', 'qx50', 'qx60', 'qx70', 'qx80'],
  'jaguar': ['e-pace', 'f-pace', 'f-type', 'i-pace', 's-type', 'x-type', 'xe', 'xf', 'xj', 'xk'],
  'jeep': ['cherokee', 'compass', 'gladiator', 'grand cherokee', 'liberty', 'patriot', 'renegade', 'wrangler'],
  'kia': ['carens', 'ceed', 'cerato', 'clarus', 'ev6', 'forte', 'k5', 'k900', 'magentis', 'morning', 'niro', 'optima', 'picanto', 'pride', 'rio', 'sedona', 'sephia', 'sorento', 'soul', 'sportage', 'stinger', 'stonic', 'telluride'],
  'lamborghini': ['aventador', 'countach', 'diablo', 'gallardo', 'huracan', 'murcielago', 'reventon', 'urus', 'veneno'],
  'land rover': ['defender', 'discovery', 'freelander', 'range rover', 'range rover evoque', 'range rover sport', 'range rover velar'],
  'lexus': ['ct', 'es', 'gs', 'hs', 'is', 'lc', 'lf-a', 'ls', 'lx', 'nx', 'rc', 'rx', 'sc', 'ux'],
  'lincoln': ['aviator', 'continental', 'corsair', 'ls', 'mark lt', 'mark viii', 'mkc', 'mks', 'mkt', 'mkx', 'mkz', 'navigator', 'town car', 'zephyr'],
  'lotus': ['elise', 'elan', 'esprit', 'europa', 'evora', 'exige'],
  'maserati': ['3200 gt', '4200 gt', 'biturbo', 'coupe', 'ghibli', 'granturismo', 'levante', 'mc20', 'quattroporte', 'spyder'],
  'mazda': ['2', '3', '5', '6', '323', '626', '929', 'atenza', 'axela', 'b-series', 'cx-3', 'cx-30', 'cx-5', 'cx-7', 'cx-9', 'demio', 'familia', 'mx-3', 'mx-5', 'mx-6', 'premacy', 'protege', 'rx-7', 'rx-8', 'tribute'],
  'mclaren': ['540c', '570s', '600lt', '650s', '675lt', '720s', '750s', '765lt', 'artura', 'f1', 'gt', 'mp4-12c', 'p1', 'senna'],
  'mercedes-benz': ['a serisi', 'b serisi', 'c serisi', 'cl serisi', 'cla', 'clk', 'cls', 'e serisi', 'g serisi', 'gl serisi', 'gla', 'glb', 'glc', 'gle', 'glk', 'gls', 'm serisi', 'r serisi', 's serisi', 'sl serisi', 'slc', 'slk', 'sls', 'v serisi', 'amg gt', 'eqa', 'eqb', 'eqc', 'eqe', 'eqs'],
  'mini': ['clubman', 'convertible', 'countryman', 'coupe', 'hardtop', 'paceman', 'roadster'],
  'mitsubishi': ['3000gt', 'asx', 'carisma', 'colt', 'diamante', 'eclipse', 'eclipse cross', 'endeavor', 'fto', 'galant', 'grandis', 'i-miev', 'l200', 'l300', 'lancer', 'mirage', 'montero', 'outlander', 'pajero', 'space star', 'space wagon'],
  'nissan': ['100nx', '200sx', '240sx', '300zx', '350z', '370z', 'almera', 'altima', 'armada', 'ariya', 'bluebird', 'cube', 'frontier', 'gt-r', 'juke', 'leaf', 'maxima', 'micra', 'murano', 'navara', 'note', 'nv200', 'pathfinder', 'patrol', 'pixo', 'primera', 'pulsar', 'qashqai', 'quest', 'rogue', 'sentra', 'silvia', 'skyline', 'sunny', 'teana', 'terrano', 'tiida', 'titan', 'versa', 'x-trail'],
  'oldsmobile': ['achieva', 'alero', 'aurora', 'bravada', 'cutlass', 'intrigue', 'silhouette'],
  'peugeot': ['1007', '106', '107', '108', '2008', '205', '206', '207', '208', '3008', '301', '306', '307', '308', '4007', '4008', '405', '406', '407', '5008', '508', '607', '806', '807', 'partner', 'rcz'],
  'pontiac': ['aztek', 'bonneville', 'firebird', 'g3', 'g5', 'g6', 'g8', 'grand am', 'grand prix', 'gto', 'montana', 'solstice', 'sunfire', 'torrent', 'vibe'],
  'porsche': ['356', '911', '912', '914', '924', '928', '944', '959', '968', 'boxster', 'carrera gt', 'cayenne', 'cayman', 'macan', 'panamera', 'taycan'],
  'ram': ['1500', '2500', '3500', 'dakota', 'promaster'],
  'renault': ['4', '5', '6', '9', '11', '12', '14', '16', '18', '19', '20', '21', '25', '30', 'clio', 'espace', 'express', 'fluence', 'fuego', 'grand scenic', 'kadjar', 'kangoo', 'koleos', 'laguna', 'megane', 'modus', 'r4', 'r5', 'r6', 'r9', 'r11', 'r12', 'r14', 'r16', 'r18', 'r19', 'r20', 'r21', 'r25', 'r30', 'safrane', 'scenic', 'symbol', 'talisman', 'twingo', 'vel satis', 'wind', 'zoe'],
  'rolls-royce': ['camargue', 'corniche', 'cullinan', 'dawn', 'ghost', 'phantom', 'silver cloud', 'silver dawn', 'silver seraph', 'silver shadow', 'silver spirit', 'silver spur', 'silver wraith', 'wraith'],
  'saab': ['9-2x', '9-3', '9-4x', '9-5', '9-7x', '90', '900', '9000', '93', '95', '96', '99'],
  'saturn': ['astra', 'aura', 'ion', 'l-series', 'outlook', 'relay', 'sky', 's-series', 'vue'],
  'scion': ['fr-s', 'ia', 'im', 'iq', 'tc', 'xa', 'xb', 'xd'],
  'seat': ['alhambra', 'altea', 'arona', 'ateca', 'cordoba', 'exeo', 'ibiza', 'leon', 'marbella', 'mii', 'tarraco', 'toledo'],
  'škoda': ['citigo', 'fabia', 'favorit', 'felicia', 'kamiq', 'karoq', 'kodiaq', 'octavia', 'rapid', 'roomster', 'scala', 'superb', 'yeti'],
  'smart': ['fortwo', 'forfour', 'roadster'],
  'subaru': ['brz', 'forester', 'impreza', 'justy', 'legacy', 'leone', 'levorg', 'outback', 'svx', 'tribeca', 'vivio', 'wrx', 'xv'],
  'suzuki': ['alto', 'baleno', 'cappuccino', 'carry', 'celerio', 'cultus', 'equator', 'esteem', 'forenza', 'grand vitara', 'ignis', 'jimny', 'kizashi', 'liana', 'maruti', 'reno', 'samurai', 'sidekick', 'splash', 'swift', 'sx4', 'verona', 'vitara', 'wagon r', 'x-90'],
  'tesla': ['model 3', 'model s', 'model x', 'model y', 'roadster', 'cybertruck'],
  'toyota': ['4runner', '86', 'auris', 'avalon', 'avensis', 'aygo', 'c-hr', 'camry', 'celica', 'corolla', 'corona', 'cressida', 'crown', 'echo', 'fj cruiser', 'highlander', 'hilux', 'iq', 'land cruiser', 'matrix', 'mr2', 'paseo', 'previa', 'prius', 'rav4', 'sequoia', 'sienna', 'solara', 'supra', 'tacoma', 'tercel', 'tundra', 'venza', 'yaris', 'bz4x'],
  'volkswagen': ['arteon', 'beetle', 'bora', 'caddy', 'corrado', 'eos', 'fox', 'golf', 'id.3', 'id.4', 'id.5', 'id.buzz', 'jetta', 'lupo', 'new beetle', 'passat', 'phaeton', 'polo', 'rabbit', 'routan', 'scirocco', 'sharan', 't-cross', 't-roc', 'tiguan', 'touareg', 'touran', 'up', 'vento'],
  'volvo': ['240', '340', '360', '440', '460', '480', '740', '760', '780', '850', '940', '960', 'c30', 'c70', 's40', 's60', 's70', 's80', 's90', 'v40', 'v50', 'v60', 'v70', 'v90', 'xc40', 'xc60', 'xc70', 'xc90']
};

export default function Step3() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || '';
  const year = searchParams.get('year') || '';

  const [selectedModel, setSelectedModel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const models = carModels[brand as keyof typeof carModels] || [];
  const filteredModels = models.filter(model =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!brand || !year) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Eksik bilgi</h1>
          <Link href="/arac-degerle" className="text-blue-600 hover:underline">
            Baştan başla
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
              Adım 3 / 7
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
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Yıl</div>
                  <div className="text-xs text-gray-500">{year}</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  3
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Model</div>
                  <div className="text-xs text-gray-500">Model seçimi</div>
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
                  <div className="text-sm font-medium text-gray-500">İletişim</div>
                  <div className="text-xs text-gray-400">Bilgileriniz</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  6
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Sonuç</div>
                  <div className="text-xs text-gray-400">Değerleme</div>
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
            {brand} Modelini Seçin
          </h1>
          <p className="text-lg text-gray-600">
            {year} yılı {brand} aracınızın modelini seçin
          </p>
        </div>

        {/* Model Selection */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Araç Modeli</h2>
          
          {/* Search Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Model ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Model List */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
            {filteredModels.map((modelName) => (
              <button
                key={modelName}
                onClick={() => setSelectedModel(modelName)}
                className={`p-3 rounded-lg border-2 transition-colors text-left ${
                  selectedModel === modelName
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <span className="text-sm font-medium">{modelName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href={`/arac-degerle/step-2?brand=${encodeURIComponent(brand)}`}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri
          </Link>
          
          <Link
            href={selectedModel ? `/arac-degerle/step-3-hasar?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(selectedModel)}&year=${year}` : '#'}
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
