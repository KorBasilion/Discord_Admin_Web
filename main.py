import discord

discord_token = {Token Here}

intents = discord.Intents.default()
client = discord.Client(intents=intents)
channel_list = { "일반" : "채널 내 안내 문구 테스트 1", "일반2" : "채널 내 안내 문구 테스트 2" }

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
        if message.channel.name in channel_list:
            embed = discord.Embed(title="채널 사용 안내", description=channel_list[message.channel.name], color=0x0aa40f)
            await message.channel.purge(limit=2, check=checker)
            await message.channel.send(embed=embed)

def checker(m):
    return m.author == client.user

client.run(discord_token)
