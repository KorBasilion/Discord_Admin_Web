import discord
import json

pinned_file_path = "./web_page/src/database/pinnedChannel.json"
pin_able_file_path = "./web_page/src/database/pinAbleChannel.json"
discord_token = 'MTA2ODc5OTI3Njc2NDg5NzQwMA.GyOFQV.e1D0E_bsiVTiXW_I4Mbj60qaGh8jItG-BjMHhc'

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)
channel_list = {}
with open(pinned_file_path, 'r', encoding='utf8') as file:
    channel_list = json.load(file)
all_text_channel = {}

@client.event
async def on_ready():
    print('We have logged in as {}'.format(client))
    print('Bot name: {}'.format(client.user.name))
    print('Bot ID: {}'.format(client.user.id))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    else:
        if message.content == "!동기화":
            sync_data()
            await message.delete()

        if message.channel.name in channel_list:
            embed = discord.Embed(title="채널 사용 안내", description=channel_list[message.channel.name], color=0x0aa40f)
            await message.channel.purge(limit=2, check=checker)
            await message.channel.send(embed=embed)

def checker(m):
    return m.author == client.user

def sync_data():
    global channel_list
    with open(pinned_file_path, 'r', encoding='utf8') as file:
        data = json.load(file)
        channel_list = data
    load_channels()
    with open(pin_able_file_path, 'w', encoding='utf8') as file:
        json.dump(all_text_channel, file, ensure_ascii=False)

def load_channels():
    global all_text_channel
    all_text_channel = {}
    text_channel_list = []
    for guild in client.guilds:
        for channel in guild.text_channels:
            if channel.name in channel_list:
                pass
            else:
                text_channel_list.append(channel.name)
    for text_channel in text_channel_list:
        all_text_channel[text_channel] = '0'

client.run(discord_token)
