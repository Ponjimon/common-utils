export type SSMLString = `<speak>${string}</speak>`;

export enum SsmlVoiceGender {
  SSML_VOICE_GENDER_UNSPECIFIED = 'SSML_VOICE_GENDER_UNSPECIFIED',
  MAlE = 'MALE',
  FEMALE = 'FEMALE',
  NEUTRAL = 'NEUTRAL',
}

export enum ReportedUsage {
  REPORTED_USAGE_UNSPECIFIED = 'REPORTED_USAGE_UNSPECIFIED',
  REALTIME = 'REALTIME',
  OFFLINE = 'OFFLINE',
}

export type CustomVoiceParams = {
  model: string;
  reportedUsage?: ReportedUsage;
};

export enum AudioEncoding {
  AUDIO_ENCODING_UNSPECIFIED = 'AUDIO_ENCODING_UNSPECIFIED',
  LINEAR16 = 'LINEAR16',
  MP3 = 'MP3',
  OGG_OPUS = 'OGG_OPUS',
  MULAW = 'MULAW',
  ALAW = 'ALAW',
}

export enum TimepointType {
  TIMEPOINT_TYPE_UNSPECIFIED = 'TIMEPOINT_TYPE_UNSPECIFIED',
  SSML_MARK = 'SSML_MARK',
}

export type Timepoint = {
  markName: string;
  timeSeconds: number;
};

export type SynthesizeInput =
  | {
      text: string;
    }
  | { ssml: SSMLString };

export type VoiceSelectionParams = {
  lanuguageCode: string;
  name?: string;
  ssmlGender?: SsmlVoiceGender;
  customVoice?: CustomVoiceParams;
};

export type AudioConfig = {
  audioEncoding: AudioEncoding;
  speakingRate?: number;
  pitch?: number;
  volumeGainDb?: number;
  sampleRateHertz?: number;
  effectsProfileId?: string[];
};

export type SynthesizeRequestBody = {
  input: SynthesizeInput;
  voice: VoiceSelectionParams;
  audioConfig: AudioConfig;
};

export type SynthesizeResponseBody = {
  audioContent: string;
};

export type SynthesizeResponseBodyV1Beta1 = SynthesizeResponseBody & {
  timepoints: Timepoint[];
  audioConfig: AudioConfig;
};

export type Voice = {
  languageCodes: string[];
  name: string;
  ssmlGender: SsmlVoiceGender;
  naturalSampleRateHertz: number;
};

export type VoicesListQueryParameters = {
  languageCode?: string;
};

export type VoicesListResponseBody = {
  voices: Voice[];
};
