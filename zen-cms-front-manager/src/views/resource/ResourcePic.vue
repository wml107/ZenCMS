<template>
    <div id="resource-workbench">
        <div class="type">{{ match(RESOURCE_TYPE, resource.path[0]) }}</div>
        <div class="path">{{ resource.path.length < 2 ? '/' : resource.path.slice(1).join('/') }}</div>
                <div class="operation">
                    <div class="forward">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                            <path fill="currentColor"
                                d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z">
                            </path>
                        </svg>
                    </div>
                    <div class="backword">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                            <path fill="currentColor"
                                d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z">
                            </path>
                        </svg>
                    </div>
                    <div class="refresh">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                            <path fill="currentColor"
                                d="M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z">
                            </path>
                        </svg>
                    </div>
                    <div class="download">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                            <path fill="currentColor"
                                d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64m384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64z">
                            </path>
                        </svg>
                    </div>
                    <div class="upload">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                            <path fill="currentColor"
                                d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64m384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248z">
                            </path>
                        </svg>
                    </div>
                    <div class="go">
                        <svg t="1709780485071" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            p-id="4822" width="200" height="200">
                            <path
                                d="M832 256v384H269.248l105.408-105.344-45.248-45.312-160 160a32 32 0 0 0 0 45.312l160 160 45.248-45.312L269.248 704H832a64 64 0 0 0 64-64V256h-64z"
                                fill="#707070" fill-opacity=".9" p-id="4823"></path>
                        </svg>
                    </div>
                    <div class="home">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                            <path fill="currentColor" d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z">
                            </path>
                        </svg>
                    </div>
                    <el-dropdown :teleported="false">
                        <div class="more-operation">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728="">
                                <path fill="currentColor"
                                    d="M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224">
                                </path>
                            </svg>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu style="background-color: #b1b3b8;">
                                <el-dropdown-item>
                                    <div class="copy">
                                        <svg t="1709780161644" viewBox="0 0 1024 1024" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" p-id="1157" width="200" height="200">
                                            <path
                                                d="M753.784471 870.520471c0 34.334118-26.985412 62.162824-60.235295 62.223058h-542.117647c-33.310118 0-60.235294-27.888941-60.235294-62.223058v-559.585883c0-34.334118 26.925176-62.162824 60.235294-62.162823h542.117647c33.249882 0 60.235294 27.828706 60.235295 62.162823v559.585883z m-60.235295-683.91153h-542.117647c-66.56 0-120.470588 55.657412-120.470588 124.325647v559.585883c0 68.668235 53.910588 124.385882 120.470588 124.385882h542.117647c66.499765 0 120.470588-55.657412 120.470589-124.385882v-559.585883c0-68.668235-53.970824-124.325647-120.470589-124.325647"
                                                fill="#666666" p-id="1158"></path>
                                            <path
                                                d="M211.365647 808.056471h240.941177v-62.223059h-240.941177v62.223059z m0-124.385883h421.647059v-62.162823h-421.647059v62.162823z m0-124.325647h421.647059V497.121882h-421.647059v62.223059z m0-124.385882h421.647059V372.856471h-421.647059V434.898824z"
                                                fill="#666666" p-id="1159"></path>
                                            <path
                                                d="M875.098353 0.180706h-542.117647c-66.56 0-120.470588 55.657412-120.470588 124.325647h60.235294c0-34.334118 26.985412-62.162824 60.235294-62.162824h542.117647c33.249882 0 60.235294 27.828706 60.235294 62.162824v559.585882c0 34.334118-26.985412 62.162824-60.235294 62.223059v62.162824c66.56 0 120.470588-55.657412 120.470588-124.385883v-559.585882c0-68.668235-53.910588-124.325647-120.470588-124.325647"
                                                fill="#666666" p-id="1160"></path>
                                        </svg>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div class="cut">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                                            data-v-ea893728="">
                                            <path fill="currentColor"
                                                d="M256 768h672a32 32 0 1 1 0 64H224a32 32 0 0 1-32-32V96a32 32 0 0 1 64 0z">
                                            </path>
                                            <path fill="currentColor"
                                                d="M832 224v704a32 32 0 1 1-64 0V256H96a32 32 0 0 1 0-64h704a32 32 0 0 1 32 32">
                                            </path>
                                        </svg>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div class="paste">
                                        <svg t="1709780184259" viewBox="0 0 1024 1024" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" p-id="1301" width="200" height="200">
                                            <path
                                                d="M917.219556 277.105778h-108.714667V200.647111a72.817778 72.817778 0 0 0-72.760889-72.760889h-124.871111v-11.605333a53.361778 53.361778 0 0 0-53.248-53.248h-39.253333V55.751111c0-15.928889-13.084444-29.013333-29.013334-29.013333H404.935111c-15.928889 0-29.013333 13.084444-29.013333 29.013333v7.281778h-39.253334a53.361778 53.361778 0 0 0-53.248 53.248v11.605333H152.462222A72.817778 72.817778 0 0 0 79.758222 200.647111v610.133333A72.817778 72.817778 0 0 0 152.462222 883.484444H261.12v62.008889a72.817778 72.817778 0 0 0 72.760889 72.704h389.802667l266.24-266.126222V349.923556a72.817778 72.817778 0 0 0-72.760889-72.817778zM331.832889 116.280889c0-2.616889 2.275556-4.835556 4.892444-4.835556h220.728889c2.673778 0 4.892444 2.275556 4.892445 4.835556v74.353778c0 2.616889-2.275556 4.892444-4.835556 4.892444H336.725333a4.892444 4.892444 0 0 1-4.835555-4.892444V116.280889zM261.233778 349.923556v485.262222H152.462222a24.405333 24.405333 0 0 1-24.291555-24.291556V200.647111c0-13.368889 10.922667-24.291556 24.291555-24.291555h131.015111v14.279111c0 29.354667 23.893333 53.304889 53.248 53.304889h220.728889c29.411556 0 53.304889-23.893333 53.304889-53.304889V176.355556h124.928c13.368889 0 24.291556 10.922667 24.291556 24.291555V277.048889h-426.097778a72.817778 72.817778 0 0 0-72.704 72.817778z m476.16 586.24v-144.554667c0-13.368889 10.808889-24.234667 24.177778-24.234667h144.554666l-168.732444 168.789334z m204.231111-217.201778h-180.053333c-40.049778 0-72.590222 32.540444-72.590223 72.647111v178.232889H333.937778a24.405333 24.405333 0 0 1-24.348445-24.291556V349.923556c0-13.312 10.979556-24.291556 24.348445-24.291556h583.281778c13.368889 0 24.291556 10.979556 24.291555 24.291556v369.038222z"
                                                fill="#666666" p-id="1302"></path>
                                            <path
                                                d="M835.982222 476.387556h-435.768889a24.234667 24.234667 0 0 0 0 48.412444h435.768889a24.291556 24.291556 0 0 0 24.234667-24.177778 24.291556 24.291556 0 0 0-24.234667-24.234666z m-193.649778 135.566222H400.270222a24.234667 24.234667 0 0 0 0 48.412444h242.062222a24.291556 24.291556 0 0 0 24.177778-24.177778 24.291556 24.291556 0 0 0-24.177778-24.234666z"
                                                fill="#666666" p-id="1303"></path>
                                        </svg>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div class="del">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                                            data-v-ea893728="">
                                            <path fill="currentColor"
                                                d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32">
                                            </path>
                                        </svg>
                                    </div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
        </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { mapState, mapActions } from 'vuex';
import { match, RESOURCE_TYPE } from '../../constants/dict';
export default {
    name: "ResourcePic",
    data() {
        return {
            RESOURCE_TYPE,
            newPassword: '',
        }
    },
    computed: {
        ...mapState([
            'resource'
        ]),
    },
    mounted: function () {
        this.go({ type: 'pic', path: '' });
    },
    methods: {
        ...mapActions('resource', [
            'go',
            'refresh',
            'forward',
            'backward',
        ]),
        match,

    }
}
</script>

<style scoped>
#resource-workbench {
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .5rem 0;
    background-color: #b1b3b8;

    .type {
        margin-left: 2rem;
        font-size: .9rem;
        padding: .08rem .5rem;
        border-radius: .15rem;
        color: #73767a;
        background-color: #e9e9eb;
    }

    .path {
        flex: 1;
        margin: 0 1rem;
        font-size: .9rem;
        padding: .07rem .7rem .09rem .7rem;
        border-radius: .15rem;
        color: #73767a;
        background-color: #e9e9eb;
    }

    .operation {
        display: flex;
        flex-direction: row;
        align-items: center;

        >div,
        .more-operation,
        .copy,
        .paste,
        .cut,
        .del {
            flex-shrink: 0;
            height: 1.5rem;
            width: 1.5rem;

            >svg {
                width: 100%;
                height: 100%;
                color: #e9e9eb;

                >path {
                    fill: #e9e9eb;
                }
            }

            >svg:hover {
                cursor: pointer;
                color: white;

                >path {
                    fill: white;
                }
            }
        }

        .copy,
        .paste,
        .cut,
        .del{
            >svg:hover {
                color: #b1b3b8;

                >path {
                    fill: #b1b3b8;
                }
            }
        }
    }
}
</style>