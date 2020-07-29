import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { init as initLeanCloud } from './leancloud'
import { init as initDva } from './dva'

initLeanCloud()
initDva()
dayjs.locale('zh-cn')
dayjs.extend(localizedFormat)
