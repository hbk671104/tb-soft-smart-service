import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { init as initLeanCloud } from './leancloud'

initLeanCloud()
dayjs.locale('zh-cn')
dayjs.extend(localizedFormat)
