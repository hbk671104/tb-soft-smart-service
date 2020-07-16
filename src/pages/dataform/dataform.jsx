import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Form,
  Input,
  Picker,
  Radio,
  RadioGroup,
  Textarea,
  Button
} from '@tarojs/components'
import './dataform.scss'

import {
  constructReportObject,
} from '../../utils/leancloud'
import { getCurrentUser } from '../../utils/login'

const radio_color = 'rgb(186, 44, 40)'

export default class DataForm extends Component {
  state = {
    serviced_at: null,
    // upload_files: null
  }

  componentWillMount() {
    this.currentUser = getCurrentUser()
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '添加记录'
  }

  onDateChange = ({ detail: { value } }) => {
    this.setState({ serviced_at: value })
  }

  onFormSubmit = ({ detail: { value } }) => {
    if (
      !value.error_detail &&
      !value.ora_error_detail &&
      !value.error_cause_detail &&
      !value.solution_detail
    ) {
      Taro.showToast({
        title: '请填写报错信息/解决方案',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!value.software_version) {
      value.software_version = '所有版本'
    }
    // add technician
    const { username } = this.currentUser
    value.technican = username
    // add files
    // const { upload_files } = this.state
    // if (upload_files && upload_files.length > 0) {
    //   value.related_files = upload_files
    // }
    this.saveReport(value)
  }

  saveReport = async value => {
    const report = constructReportObject(value)
    try {
      Taro.showLoading({ title: '保存中...' })
      let result = await report.save()
      result = result.toJSON()
      Taro.redirectTo({
        url: `../index/result/detail?id=${result.objectId}`
      })
      Taro.showToast({
        title: '保存成功!',
        icon: 'success',
        duration: 2000
      })
    } catch (error) {
      console.error(error)
    } finally {
      Taro.hideLoading()
    }
  }

  // onDocChoose = async e => {
  //   e.stopPropagation()
  //   try {
  //     const { tempFiles } = await Taro.chooseMessageFile({
  //       count: 5,
  //       type: 'file'
  //     })
  //     this.saveFile(tempFiles)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // saveFile = async files => {
  //   const docs = files.map(({ name, path }) => buildDocument(name, path))
  //   try {
  //     Taro.showLoading({ title: '上传中...' })
  //     let result = await Promise.all(
  //       docs.map(d => d.save({ keepFileName: true }))
  //     )
  //     result = result.map(r => r.toJSON())
  //     this.setState(({ upload_files }) => {
  //       return {
  //         upload_files: !upload_files ? result : [...upload_files, ...result]
  //       }
  //     })
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     Taro.hideLoading()
  //   }
  // }

  // onDeleteClick = item => async e => {
  //   e.stopPropagation()
  //   try {
  //     const { confirm } = await Taro.showModal({
  //       title: '提示',
  //       content: `确认删除「${item.name}」吗？`,
  //       confirmText: '删除',
  //       confirmColor: '#BA2C28'
  //     })
  //     if (confirm) {
  //       this.deleteFile(item.objectId)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // deleteFile = async id => {
  //   const file = buildDocumentToDelete(id)
  //   try {
  //     Taro.showLoading({ title: '正在删除...' })
  //     await file.destroy()
  //     this.setState(({ upload_files }) => ({
  //       upload_files: upload_files.filter(f => f.objectId !== id)
  //     }))
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     Taro.hideLoading()
  //   }
  // }

  render() {
    const { serviced_at } = this.state
    return (
      <View className='page data-form'>
        <Form onSubmit={this.onFormSubmit}>
          <View className='item-container'>
            <Text className='item-title'>客户名称：</Text>
            <View className='input-container'>
              <Input
                name='client_name'
                adjustPosition
                className='input'
                placeholderClass='input-placeholder'
                placeholder='请输入客户名称'
              />
            </View>
          </View>
          <View className='item-container'>
            <Text className='item-title'>服务时间：</Text>
            <Picker mode='date' name='serviced_at' onChange={this.onDateChange}>
              <View className='input-container'>
                <Text
                  className={`input ${!serviced_at && 'input-placeholder'}`}
                >
                  {!!serviced_at ? serviced_at : '请选择服务时间'}
                </Text>
              </View>
            </Picker>
          </View>
          <View className='item-container'>
            <Text className='item-title'>软件版本：</Text>
            <View className='input-container'>
              <Input
                name='software_version'
                adjustPosition
                className='input'
                placeholderClass='input-placeholder'
                placeholder='请输入软件版本'
              />
            </View>
          </View>
          <View className='item-container'>
            <Text className='item-title'>运行状态：</Text>
            <View className='input-container'>
              <Input
                name='software_state'
                adjustPosition
                className='input'
                placeholderClass='input-placeholder'
                placeholder='请输入运行状态'
              />
            </View>
          </View>
          <View className='item-container'>
            <Text className='item-title'>运行类型：</Text>
            <View className='radio-container'>
              <RadioGroup name='software_type'>
                <Radio
                  className='radio'
                  color={radio_color}
                  value='全量'
                  checked
                >
                  全量
                </Radio>
                <Radio
                  className='radio'
                  style='margin-left: 12px;'
                  color={radio_color}
                  value='增量'
                >
                  增量
                </Radio>
              </RadioGroup>
            </View>
          </View>
          <View className='item-container'>
            <Text className='item-title'>报错代码信息：</Text>
            <View className='input-container'>
              <Textarea
                name='error_detail'
                adjustPosition
                autoHeight
                maxlength={-1}
                className='area-input'
                placeholderClass='input-placeholder'
                placeholder='请输入报错代码信息'
              />
            </View>
          </View>
          <View className='item-container'>
            <Text className='item-title'>ORA 报错信息：</Text>
            <View className='input-container'>
              <Textarea
                name='ora_error_detail'
                adjustPosition
                autoHeight
                maxlength={-1}
                className='area-input'
                placeholderClass='input-placeholder'
                placeholder='请输入 ORA 报错信息'
              />
            </View>
          </View>
          <View className='item-container'>
            <Text className='item-title'>故障原因：</Text>
            <View className='input-container'>
              <Textarea
                name='error_cause_detail'
                adjustPosition
                autoHeight
                maxlength={-1}
                className='area-input'
                placeholderClass='input-placeholder'
                placeholder='请输入故障原因'
              />
            </View>
          </View>
          <View className='item-container'>
            <Text className='item-title'>处理方案：</Text>
            <View className='input-container'>
              <Textarea
                name='solution_detail'
                adjustPosition
                autoHeight
                maxlength={-1}
                className='area-input'
                placeholderClass='input-placeholder'
                placeholder='请输入处理方案'
              />
            </View>
          </View>
          {/* <View className='item-container'>
            <View className='document-title-container'>
              <Text className='item-title'>相关文档：</Text>
              <View style='display:flex;align-items:center;'>
                <Button size='mini' onClick={this.onDocChoose}>
                  选择
                </Button>
              </View>
            </View>
            {!!upload_files && upload_files.length > 0 && (
              <View className='document-container'>
                {upload_files.map((f, i) => (
                  <View key={f.objectId} className='document-item-container'>
                    <Text className='document-item-text'>
                      {i + 1}.{' '}
                      <Text style='color:blue;text-decoration:underline;'>
                        {f.name}
                      </Text>
                    </Text>
                    <Text
                      className='document-item-delete-text'
                      onClick={this.onDeleteClick(f)}
                    >
                      删除
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View> */}
          <View className='submit-button-container'>
            <Button
              className='submit-button'
              hoverClass='submit-button-hover'
              formType='submit'
            >
              提交
            </Button>
          </View>
        </Form>
      </View>
    )
  }
}
