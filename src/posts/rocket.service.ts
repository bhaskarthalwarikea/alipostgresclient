import { MQClient, MessageProperties } from '@aliyunmq/mq-http-sdk';
import { Data } from './messagedata.dto';

export class RocketTest {
  private endpoint =
    'http://1060444989355026.mqrest.cn-shanghai-internal.aliyuncs.com';
  private topic = 'scheduledtopic';
  private instanceId = 'xyz';
  private accessKeyId = 'xyz';
  private accessKeySecret = 'xyz';

  private client = new MQClient(
    this.endpoint,
    this.accessKeyId,
    this.accessKeySecret,
  );

  public async sendToTopic(data: Data) {
    try {
      const msgProps = new MessageProperties();
      msgProps.putProperty('messageId', data.msgId);
      msgProps.messageKey(data.msgId);
      if (data.body.eventName == 'REMINDER') {
        this.topic = 'scheduledtopic';
        msgProps.startDeliverTime(Date.now() + 180 * 1000);
      } else {
        this.topic = 'canceltopic';
      }
      const producer = this.client.getProducer(this.instanceId, this.topic);
      const res = await producer.publishMessage(
        JSON.stringify(data.body),
        '',
        msgProps,
      );
      console.log(
        'Publish message: MessageID:%s,BodyMD5:%s',
        res.body.MessageId,
        res.body.MessageBodyMD5,
      );
    } catch (e) {
      console.log(e);
    }
  }

  public async deleteTheScheduledMessageDelayOffset(data: Data) {
    try {
      const msgProps = new MessageProperties();
      msgProps.putProperty('msgId', data.msgId);
      msgProps.putProperty('MessageId', data.msgId);
      msgProps.putProperty('RequestId', data.body.requestId);
      msgProps.messageKey(data.msgId);
      msgProps.startDeliverTime(Date.now() - 60 * 1000);
      const producer = this.client.getProducer(this.instanceId, this.topic);
      const res = await producer.publishMessage(
        JSON.stringify(data.body),
        '',
        msgProps,
      );
      console.log(
        'Publish message: MessageID:%s,BodyMD5:%s',
        res.body.MessageId,
        res.body.MessageBodyMD5,
      );
    } catch (e) {
      console.log(e);
    }
  }
}
